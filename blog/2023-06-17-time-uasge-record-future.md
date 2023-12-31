---
slug: 任务用时记录（TimeUsageRecordFuture）
title: 任务用时记录（TimeUsageRecordFuture）
authors: GoodJooy
tags: [Rust]
---

在实践中，由于某些异常（比如死锁）会使得异步任务长时间处于挂起状态。因此，让异步任务能够在每隔固定时间报告一次当前任务累计运行时间，以迅速找到可能的出现异常的异步任务位置的功能支持就变得似乎很有必要。

因此，本次的目标就是希望制作一个 `Future` 类型，能够支持在指定时间之后定时报告任务用时或者其他信息。即 `TimeUsageRecordFuture`

## 功能分析

对于这个任务，其实功能需求非常简单。根据需求，就可以反推具体的数据结构

1. 我们希望这个 `Future` 可以通用，即我们可以将任意的其他 `Future` 类型放入其中作为要报告用时的任务
   - 需要使用泛型参数，接受任意的 `Future` 类型
2. 我们希望这个 `Future` 可以定时执行某些任务
   - 需要一个 **定时器** ， 以能够定时执行任务
   - 需要另一个泛型参数，以接受 **执行什么任务?** 信息
3. 需要知道从任务开始后过了多长时间
   - 需要一个 **时间** 记录启动时间，并且是启动时才写入的

同样的，根据需求，也可以推导 `Future` 的实现。 可以很明显知道，`Future` 中有 3 种状态

1. 被包裹的 `Future` 完成：此时，不需要理会定时器状态，直接响应 `Ready`(完成)
2. 被包裹的 `Future` 正在进行，定时器到达定时点：此时，需要重置定时器状态，并执行指定任务，然后响应 `Pending`(正忙)
3. 被包裹的 `Future` 和定时器 均正在进行：此时，直接响应 `Pending`(正忙)

基于以上的功能要求，我们就能制作出我们需要的 `Future` 类型了

## 依赖准备

根据功能分析，我们需要以下的额外内容

- [`tokio`](https://tokio.rs/) 并开启 `time` features

为了方便实现 `Future` , 可以选择添加以下依赖

- [`pin_project`](https://docs.rs/pin-project/latest/pin_project/)

  > 这个 crate 提供一个过程宏，以将较大粒度的 `Pin` (Pin 住整个结构体)，转化为较小粒度的 `Pin` (只 Pin 某几个特定 field)

以下是依赖在 `Cargo.toml` 里面的样子

```toml
[dependencies]
pin-project = "1.1.0"
tokio = { version = "1.28.2", features = ["time"] }
```

## 代码实现

根据前置的功能分析，我们可以轻易定义出我们的 `TimeUsageRecordFuture`

```rust
#[pin_project]
pub struct TimeUsageRecordFuture<Fut, Recorder> {
    #[pin]
    fut: Fut,
    timer: Interval,
    recorder: Recorder,
    start_at: Option<Instant>,
}

```

其中

- fut: `Fut` 是被包裹的`Future`， 被标注为 pin, 也就是降低粒度后依然是被`Pin` 包裹的
- timer: `Interval` 是 定时器
- recorder: `Recorder` 是每次时间到后需要执行的任务
- start_at: `Option<Instant>` 任务开始时间，当 None 时，任务未开始， `Some` 时任务已经开始

> 为什么没有在结构体声明中进行泛型约束？
>
> 在很多 Rust 最佳实践中，都是推荐在 `impl` 代码块中在需要的时候再添加泛型约束。这样可以一定程度添加灵活性。但社区同样也有人认为将约束添加在类型声明中，可以避免某些约束缺失带来的奇怪的编译器报错。

接下来，就是 `Future` 的实现了。基于前面的分析，我们的`Future`状态机需要维护 3 种状态的响应

> `Future::poll(Pin<&mut Self>, &mut Context<'_>) -> Poll<Future::Output>` 是 `Future` 的核心函数，在该异步任务开始后，异步运行时会执行该函数，如果该函数返回 `Poll::Ready` 那这个异步任务就完成了。否则，异步运行时会将该任务放入等待队列中。当这个异步任务准备好进入下一个状态时，会调用从 `Context<'_>` 中获得的 `wake` 函数，以告知异步运行时。此时异步运行时将会把对应的异步任务加入就绪队列，等待执行（调用`poll`）

以下为具体代码

```rust
impl<Fut, Recorder> Future for TimeUsageRecordFuture<Fut, Recorder>
where
    Fut: Future,
    Recorder: FnMut(Duration),
{
    type Output = Fut::Output;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> std::task::Poll<Self::Output> {
        let this = self.project();
        match (this.fut.poll(cx), this.timer.poll_tick(cx)) {
            (ret @ Poll::Ready(_), _) => ret,
            (Poll::Pending, Poll::Ready(current_time)) => {
                this.timer.reset();
                if let Some(start_time) = *this.start_at {
                    let duration = current_time.duration_since(start_time);
                    (this.recorder)(duration)
                } else {
                    let _ =this.start_at.insert(current_time);
                }
                Poll::Pending
            }
            (Poll::Pending, Poll::Pending) => Poll::Pending,
        }
    }
}
```

由于使用了`pin-project` 这里可以隐藏全部的`unsafe`代码，只要使用 `self.project()`就能获得降低粒度版本的*this*

而实现的主要内容，就是根据 `Fut::poll` 和 `Interval::poll_tick` 的返回结果，来进行相应的操作。具体操作与先前功能分析一致

> 在计时器完成后，有一部分特殊的代码，这是为了用来处理第一次进入时，Interval 会立即返回（`Ready`）这样在任务开始时可以记录下开始的时间点（`None` -> `Some(Instant)`）

当然别忘记，在实现 Future 时，我们需要要求 `Fut` 泛型参数实现 `Future` 和 `Recorder` 泛型参数实现 `FnMut(Duration)`

## 周边辅助

对于刚刚定义的 `TimeUsageRecordFuture` 显然我们不希望用户能够随意构造（如果用户构造时直接为 `start_at` 给定了具体时间点，将会产生错误的任务时长记录）。因此，我们可以提供一个 `new` 构造函数，以正确地初始化我们的 `Future`

```rust
impl<Fut, Recorder> TimeUsageRecordFuture<Fut, Recorder> {
    pub fn new(fut: Fut, recorder: Recorder, period: Duration) -> Self
    where
        Fut: Future,
        Recorder: FnMut(Duration),
    {
        Self {
            fut,
            timer: interval(period),
            recorder,
            start_at: None,
        }
    }
}
```

只要以上简单的代码，就能进行 `TimeUsageRecordFuture` , 并且能够避免用户错误的构造带来的错误行为。

但是，`new` 是关联函数，对于畅快的链式调用就像翠翠连续浓密的腿毛突然断开了，是相当不舒服的，是否能够将构造加入链式调用呢？ 当然！

我们需要一个 `trait` 就叫 `IntoTimeUsageRecordFuture`吧 , 对于任意 `Future` 实现这个 `trait`, 这样就能在链式调用中直接使用其中的接口，进行如同顺着水水的毛吸猫一样舒适的链式调用。就像下面这样

```rust
pub trait IntoTimeUsageRecordFuture: Future + Sized {
    fn time_usage_record<Func>(
        self,
        recorder: Func,
        period: Duration,
    ) -> TimeUsageRecordFuture<Self, Func>
    where
        Func: FnMut(Duration),
    {
        TimeUsageRecordFuture::new(self, recorder, period)
    }
}

impl<F> IntoTimeUsageRecordFuture for F where F: Future + Sized {}
```

## 简单测试

为了测试代码是否能够如预期运行，我简易编写了个单元测试, 如下

```rust
#[tokio::test]
async fn test() {
    sleep(Duration::from_secs(1))
        .time_usage_record(
            |usage| println!("using time {}ms", usage.as_millis()),
            Duration::from_millis(100),
        )
        .await
}
```

以下是单元测试的输出

```bash
running 1 test
using time 114ms
using time 222ms
using time 332ms
using time 442ms
using time 551ms
using time 660ms
using time 770ms
using time 879ms
using time 988ms
test test ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 1.02s
```

虽然有一定误差，但是可以看到我们的代码正如我们预期运行！

> 单元测试需要启用 `tokio` 的 `test-util` 和 `macros` features

## 完整代码

以下为完整的代码

```rust
use std::{
    future::Future,
    pin::Pin,
    task::{Context, Poll},
    time::Duration,
};

use pin_project::pin_project;
use tokio::time::{interval, sleep, Instant, Interval};

#[pin_project]
pub struct TimeUsageRecordFuture<Fut, Recorder> {
    #[pin]
    fut: Fut,
    timer: Interval,
    recorder: Recorder,
    start_at: Option<Instant>,
}

impl<Fut, Recorder> TimeUsageRecordFuture<Fut, Recorder> {
    pub fn new(fut: Fut, recorder: Recorder, period: Duration) -> Self
    where
        Fut: Future,
        Recorder: FnMut(Duration),
    {
        Self {
            fut,
            timer: interval(period),
            recorder,
            start_at: None,
        }
    }
}

impl<Fut, Recorder> Future for TimeUsageRecordFuture<Fut, Recorder>
where
    Fut: Future,
    Recorder: FnMut(Duration),
{
    type Output = Fut::Output;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> std::task::Poll<Self::Output> {
        let this = self.project();
        match (this.fut.poll(cx), this.timer.poll_tick(cx)) {
            (ret @ Poll::Ready(_), _) => ret,
            (Poll::Pending, Poll::Ready(current_time)) => {
                this.timer.reset();
                if let Some(start_time) = *this.start_at {
                    let duration = current_time.duration_since(start_time);
                    (this.recorder)(duration)
                } else {
                    let _ = this.start_at.insert(current_time);
                }
                Poll::Pending
            }
            (Poll::Pending, Poll::Pending) => Poll::Pending,
        }
    }
}

pub trait IntoTimeUsageRecordFuture: Future + Sized {
    fn time_usage_record<Func>(
        self,
        recorder: Func,
        period: Duration,
    ) -> TimeUsageRecordFuture<Self, Func>
    where
        Func: FnMut(Duration),
    {
        TimeUsageRecordFuture::new(self, recorder, period)
    }
}

impl<F> IntoTimeUsageRecordFuture for F where F: Future + Sized {}

#[tokio::test]
async fn test() {
    sleep(Duration::from_secs(1))
        .time_usage_record(
            |usage| println!("using time {}ms", usage.as_millis()),
            Duration::from_millis(100),
        )
        .await
}
```
