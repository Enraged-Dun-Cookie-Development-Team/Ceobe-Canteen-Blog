"use strict";(self.webpackChunkceobe_canteen_blog=self.webpackChunkceobe_canteen_blog||[]).push([[308],{932:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"\u4efb\u52a1\u7528\u65f6\u8bb0\u5f55\uff08TimeUsageRecordFuture\uff09","metadata":{"permalink":"/Ceobe-Canteen-Blog/blog/\u4efb\u52a1\u7528\u65f6\u8bb0\u5f55\uff08TimeUsageRecordFuture\uff09","editUrl":"https://github.com/Enraged-Dun-Cookie-Development-Team/Ceobe-Canteen-Blog/blob/main/blog/2023-06-17-dev.md","source":"@site/blog/2023-06-17-dev.md","title":"\u4efb\u52a1\u7528\u65f6\u8bb0\u5f55\uff08TimeUsageRecordFuture\uff09","description":"\u5728\u5b9e\u8df5\u4e2d\uff0c\u7531\u4e8e\u67d0\u4e9b\u5f02\u5e38\uff08\u6bd4\u5982\u6b7b\u9501\uff09\u4f1a\u4f7f\u5f97\u5f02\u6b65\u4efb\u52a1\u957f\u65f6\u95f4\u5904\u4e8e\u6302\u8d77\u72b6\u6001\u3002\u56e0\u6b64\uff0c\u8ba9\u5f02\u6b65\u4efb\u52a1\u80fd\u591f\u5728\u6bcf\u9694\u56fa\u5b9a\u65f6\u95f4\u62a5\u544a\u4e00\u6b21\u5f53\u524d\u4efb\u52a1\u7d2f\u8ba1\u8fd0\u884c\u65f6\u95f4\uff0c\u4ee5\u8fc5\u901f\u627e\u5230\u53ef\u80fd\u7684\u51fa\u73b0\u5f02\u5e38\u7684\u5f02\u6b65\u4efb\u52a1\u4f4d\u7f6e\u7684\u529f\u80fd\u652f\u6301\u5c31\u53d8\u5f97\u4f3c\u4e4e\u5f88\u6709\u5fc5\u8981\u3002","date":"2023-06-17T00:00:00.000Z","formattedDate":"2023\u5e746\u670817\u65e5","tags":[{"label":"Rust","permalink":"/Ceobe-Canteen-Blog/blog/tags/rust"}],"readingTime":9.585,"hasTruncateMarker":false,"authors":[{"name":"\u51ca\u5f26\u51dd\u7edd","title":"\u5c0f\u523b\u98df\u5802\u540e\u7aef","url":"https://github.com/GoodJooy","imageURL":"https://github.com/Goodjooy.png","key":"endi"}],"frontMatter":{"slug":"\u4efb\u52a1\u7528\u65f6\u8bb0\u5f55\uff08TimeUsageRecordFuture\uff09","title":"\u4efb\u52a1\u7528\u65f6\u8bb0\u5f55\uff08TimeUsageRecordFuture\uff09","authors":"endi","tags":["Rust"]}},"content":"\u5728\u5b9e\u8df5\u4e2d\uff0c\u7531\u4e8e\u67d0\u4e9b\u5f02\u5e38\uff08\u6bd4\u5982\u6b7b\u9501\uff09\u4f1a\u4f7f\u5f97\u5f02\u6b65\u4efb\u52a1\u957f\u65f6\u95f4\u5904\u4e8e\u6302\u8d77\u72b6\u6001\u3002\u56e0\u6b64\uff0c\u8ba9\u5f02\u6b65\u4efb\u52a1\u80fd\u591f\u5728\u6bcf\u9694\u56fa\u5b9a\u65f6\u95f4\u62a5\u544a\u4e00\u6b21\u5f53\u524d\u4efb\u52a1\u7d2f\u8ba1\u8fd0\u884c\u65f6\u95f4\uff0c\u4ee5\u8fc5\u901f\u627e\u5230\u53ef\u80fd\u7684\u51fa\u73b0\u5f02\u5e38\u7684\u5f02\u6b65\u4efb\u52a1\u4f4d\u7f6e\u7684\u529f\u80fd\u652f\u6301\u5c31\u53d8\u5f97\u4f3c\u4e4e\u5f88\u6709\u5fc5\u8981\u3002\\n\\n\u56e0\u6b64\uff0c\u672c\u6b21\u7684\u76ee\u6807\u5c31\u662f\u5e0c\u671b\u5236\u4f5c\u4e00\u4e2a `Future` \u7c7b\u578b\uff0c\u80fd\u591f\u652f\u6301\u5728\u6307\u5b9a\u65f6\u95f4\u4e4b\u540e\u5b9a\u65f6\u62a5\u544a\u4efb\u52a1\u7528\u65f6\u6216\u8005\u5176\u4ed6\u4fe1\u606f\u3002\u5373 `TimeUsageRecordFuture`\\n\\n## \u529f\u80fd\u5206\u6790\\n\\n\u5bf9\u4e8e\u8fd9\u4e2a\u4efb\u52a1\uff0c\u5176\u5b9e\u529f\u80fd\u9700\u6c42\u975e\u5e38\u7b80\u5355\u3002\u6839\u636e\u9700\u6c42\uff0c\u5c31\u53ef\u4ee5\u53cd\u63a8\u5177\u4f53\u7684\u6570\u636e\u7ed3\u6784\\n\\n1. \u6211\u4eec\u5e0c\u671b\u8fd9\u4e2a `Future` \u53ef\u4ee5\u901a\u7528\uff0c\u5373\u6211\u4eec\u53ef\u4ee5\u5c06\u4efb\u610f\u7684\u5176\u4ed6 `Future` \u7c7b\u578b\u653e\u5165\u5176\u4e2d\u4f5c\u4e3a\u8981\u62a5\u544a\u7528\u65f6\u7684\u4efb\u52a1\\n   - \u9700\u8981\u4f7f\u7528\u6cdb\u578b\u53c2\u6570\uff0c\u63a5\u53d7\u4efb\u610f\u7684 `Future` \u7c7b\u578b\\n2. \u6211\u4eec\u5e0c\u671b\u8fd9\u4e2a `Future` \u53ef\u4ee5\u5b9a\u65f6\u6267\u884c\u67d0\u4e9b\u4efb\u52a1\\n   - \u9700\u8981\u4e00\u4e2a **\u5b9a\u65f6\u5668** \uff0c \u4ee5\u80fd\u591f\u5b9a\u65f6\u6267\u884c\u4efb\u52a1\\n   - \u9700\u8981\u53e6\u4e00\u4e2a\u6cdb\u578b\u53c2\u6570\uff0c\u4ee5\u63a5\u53d7 **\u6267\u884c\u4ec0\u4e48\u4efb\u52a1?** \u4fe1\u606f\\n3. \u9700\u8981\u77e5\u9053\u4ece\u4efb\u52a1\u5f00\u59cb\u540e\u8fc7\u4e86\u591a\u957f\u65f6\u95f4\\n   - \u9700\u8981\u4e00\u4e2a **\u65f6\u95f4** \u8bb0\u5f55\u542f\u52a8\u65f6\u95f4\uff0c\u5e76\u4e14\u662f\u542f\u52a8\u65f6\u624d\u5199\u5165\u7684\\n\\n\u540c\u6837\u7684\uff0c\u6839\u636e\u9700\u6c42\uff0c\u4e5f\u53ef\u4ee5\u63a8\u5bfc `Future` \u7684\u5b9e\u73b0\u3002 \u53ef\u4ee5\u5f88\u660e\u663e\u77e5\u9053\uff0c`Future` \u4e2d\u67093\u79cd\u72b6\u6001\\n\\n1. \u88ab\u5305\u88f9\u7684 `Future` \u5b8c\u6210\uff1a\u6b64\u65f6\uff0c\u4e0d\u9700\u8981\u7406\u4f1a\u5b9a\u65f6\u5668\u72b6\u6001\uff0c\u76f4\u63a5\u54cd\u5e94 `Ready`(\u5b8c\u6210)\\n2. \u88ab\u5305\u88f9\u7684 `Future` \u6b63\u5728\u8fdb\u884c\uff0c\u5b9a\u65f6\u5668\u5230\u8fbe\u5b9a\u65f6\u70b9\uff1a\u6b64\u65f6\uff0c\u9700\u8981\u91cd\u7f6e\u5b9a\u65f6\u5668\u72b6\u6001\uff0c\u5e76\u6267\u884c\u6307\u5b9a\u4efb\u52a1\uff0c\u7136\u540e\u54cd\u5e94 `Pending`(\u6b63\u5fd9)\\n3. \u88ab\u5305\u88f9\u7684 `Future` \u548c\u5b9a\u65f6\u5668 \u5747\u6b63\u5728\u8fdb\u884c\uff1a\u6b64\u65f6\uff0c\u76f4\u63a5\u54cd\u5e94 `Pending`(\u6b63\u5fd9)\\n\\n\u57fa\u4e8e\u4ee5\u4e0a\u7684\u529f\u80fd\u8981\u6c42\uff0c\u6211\u4eec\u5c31\u80fd\u5236\u4f5c\u51fa\u6211\u4eec\u9700\u8981\u7684 `Future` \u7c7b\u578b\u4e86\\n\\n## \u4f9d\u8d56\u51c6\u5907\\n\\n\u6839\u636e\u529f\u80fd\u5206\u6790\uff0c\u6211\u4eec\u9700\u8981\u4ee5\u4e0b\u7684\u989d\u5916\u5185\u5bb9\\n\\n- [`tokio`](https://tokio.rs/) \u5e76\u5f00\u542f `time` features\\n\\n\u4e3a\u4e86\u65b9\u4fbf\u5b9e\u73b0 `Future` , \u53ef\u4ee5\u9009\u62e9\u6dfb\u52a0\u4ee5\u4e0b\u4f9d\u8d56\\n\\n- [`pin_project`](https://docs.rs/pin-project/latest/pin_project/)\\n\\n   >\u8fd9\u4e2acrate \u63d0\u4f9b\u4e00\u4e2a\u8fc7\u7a0b\u5b8f\uff0c\u4ee5\u5c06\u8f83\u5927\u7c92\u5ea6\u7684 `Pin` (Pin\u4f4f\u6574\u4e2a\u7ed3\u6784\u4f53)\uff0c\u8f6c\u5316\u4e3a\u8f83\u5c0f\u7c92\u5ea6\u7684 `Pin` (\u53eaPin\u67d0\u51e0\u4e2a\u7279\u5b9afield)\\n\\n\u4ee5\u4e0b\u662f\u4f9d\u8d56\u5728 `Cargo.toml` \u91cc\u9762\u7684\u6837\u5b50\\n\\n```toml\\n[dependencies]\\npin-project = \\"1.1.0\\"\\ntokio = { version = \\"1.28.2\\", features = [\\"time\\"] }\\n```\\n\\n## \u4ee3\u7801\u5b9e\u73b0\\n\\n\u6839\u636e\u524d\u7f6e\u7684\u529f\u80fd\u5206\u6790\uff0c\u6211\u4eec\u53ef\u4ee5\u8f7b\u6613\u5b9a\u4e49\u51fa\u6211\u4eec\u7684 `TimeUsageRecordFuture`\\n\\n```rust\\n#[pin_project]\\npub struct TimeUsageRecordFuture<Fut, Recorder> {\\n    #[pin]\\n    fut: Fut,\\n    timer: Interval,\\n    recorder: Recorder,\\n    start_at: Option<Instant>,\\n}\\n\\n```\\n\\n\u5176\u4e2d\\n\\n- fut: `Fut` \u662f\u88ab\u5305\u88f9\u7684`Future`\uff0c \u88ab\u6807\u6ce8\u4e3a pin, \u4e5f\u5c31\u662f\u964d\u4f4e\u7c92\u5ea6\u540e\u4f9d\u7136\u662f\u88ab`Pin` \u5305\u88f9\u7684\\n- timer: `Interval` \u662f \u5b9a\u65f6\u5668\\n- recorder: `Recorder` \u662f\u6bcf\u6b21\u65f6\u95f4\u5230\u540e\u9700\u8981\u6267\u884c\u7684\u4efb\u52a1\\n- start_at: `Option<Instant>` \u4efb\u52a1\u5f00\u59cb\u65f6\u95f4\uff0c\u5f53None \u65f6\uff0c\u4efb\u52a1\u672a\u5f00\u59cb\uff0c `Some` \u65f6\u4efb\u52a1\u5df2\u7ecf\u5f00\u59cb\\n\\n> \u4e3a\u4ec0\u4e48\u6ca1\u6709\u5728\u7ed3\u6784\u4f53\u58f0\u660e\u4e2d\u8fdb\u884c\u6cdb\u578b\u7ea6\u675f\uff1f\\n>\\n>\u5728\u5f88\u591aRust\u6700\u4f73\u5b9e\u8df5\u4e2d\uff0c\u90fd\u662f\u63a8\u8350\u5728 `impl` \u4ee3\u7801\u5757\u4e2d\u5728\u9700\u8981\u7684\u65f6\u5019\u518d\u6dfb\u52a0\u6cdb\u578b\u7ea6\u675f\u3002\u8fd9\u6837\u53ef\u4ee5\u4e00\u5b9a\u7a0b\u5ea6\u6dfb\u52a0\u7075\u6d3b\u6027\u3002\u4f46\u793e\u533a\u540c\u6837\u4e5f\u6709\u4eba\u8ba4\u4e3a\u5c06\u7ea6\u675f\u6dfb\u52a0\u5728\u7c7b\u578b\u58f0\u660e\u4e2d\uff0c\u53ef\u4ee5\u907f\u514d\u67d0\u4e9b\u7ea6\u675f\u7f3a\u5931\u5e26\u6765\u7684\u5947\u602a\u7684\u7f16\u8bd1\u5668\u62a5\u9519\u3002\\n\\n\u63a5\u4e0b\u6765\uff0c\u5c31\u662f `Future` \u7684\u5b9e\u73b0\u4e86\u3002\u57fa\u4e8e\u524d\u9762\u7684\u5206\u6790\uff0c\u6211\u4eec\u7684`Future`\u72b6\u6001\u673a\u9700\u8981\u7ef4\u62a43\u79cd\u72b6\u6001\u7684\u54cd\u5e94\\n\\n> `Future::poll(Pin<&mut Self>, &mut Context<\'_>) -> Poll<Future::Output>`  \u662f `Future` \u7684\u6838\u5fc3\u51fd\u6570\uff0c\u5728\u8be5\u5f02\u6b65\u4efb\u52a1\u5f00\u59cb\u540e\uff0c\u5f02\u6b65\u8fd0\u884c\u65f6\u4f1a\u6267\u884c\u8be5\u51fd\u6570\uff0c\u5982\u679c\u8be5\u51fd\u6570\u8fd4\u56de `Poll::Ready` \u90a3\u8fd9\u4e2a\u5f02\u6b65\u4efb\u52a1\u5c31\u5b8c\u6210\u4e86\u3002\u5426\u5219\uff0c\u5f02\u6b65\u8fd0\u884c\u65f6\u4f1a\u5c06\u8be5\u4efb\u52a1\u653e\u5165\u7b49\u5f85\u961f\u5217\u4e2d\u3002\u5f53\u8fd9\u4e2a\u5f02\u6b65\u4efb\u52a1\u51c6\u5907\u597d\u8fdb\u5165\u4e0b\u4e00\u4e2a\u72b6\u6001\u65f6\uff0c\u4f1a\u8c03\u7528\u4ece `Context<\'_>` \u4e2d\u83b7\u5f97\u7684 `wake` \u51fd\u6570\uff0c\u4ee5\u544a\u77e5\u5f02\u6b65\u8fd0\u884c\u65f6\u3002\u6b64\u65f6\u5f02\u6b65\u8fd0\u884c\u65f6\u5c06\u4f1a\u628a\u5bf9\u5e94\u7684\u5f02\u6b65\u4efb\u52a1\u52a0\u5165\u5c31\u7eea\u961f\u5217\uff0c\u7b49\u5f85\u6267\u884c\uff08\u8c03\u7528`poll`\uff09\\n\\n\u4ee5\u4e0b\u4e3a\u5177\u4f53\u4ee3\u7801\\n\\n```rust\\nimpl<Fut, Recorder> Future for TimeUsageRecordFuture<Fut, Recorder>\\nwhere\\n    Fut: Future,\\n    Recorder: FnMut(Duration),\\n{\\n    type Output = Fut::Output;\\n\\n    fn poll(self: Pin<&mut Self>, cx: &mut Context<\'_>) -> std::task::Poll<Self::Output> {\\n        let this = self.project();\\n        match (this.fut.poll(cx), this.timer.poll_tick(cx)) {\\n            (ret @ Poll::Ready(_), _) => ret,\\n            (Poll::Pending, Poll::Ready(current_time)) => {\\n                this.timer.reset();\\n                if let Some(start_time) = *this.start_at {\\n                    let duration = current_time.duration_since(start_time);\\n                    (this.recorder)(duration)\\n                } else {\\n                    let _ =this.start_at.insert(current_time);\\n                }\\n                Poll::Pending\\n            }\\n            (Poll::Pending, Poll::Pending) => Poll::Pending,\\n        }\\n    }\\n}\\n```\\n\\n\u7531\u4e8e\u4f7f\u7528\u4e86`pin-project` \u8fd9\u91cc\u53ef\u4ee5\u9690\u85cf\u5168\u90e8\u7684`unsafe`\u4ee3\u7801\uff0c\u53ea\u8981\u4f7f\u7528 `self.project()`\u5c31\u80fd\u83b7\u5f97\u964d\u4f4e\u7c92\u5ea6\u7248\u672c\u7684*this*\\n\\n\u800c\u5b9e\u73b0\u7684\u4e3b\u8981\u5185\u5bb9\uff0c\u5c31\u662f\u6839\u636e `Fut::poll` \u548c `Interval::poll_tick` \u7684\u8fd4\u56de\u7ed3\u679c\uff0c\u6765\u8fdb\u884c\u76f8\u5e94\u7684\u64cd\u4f5c\u3002\u5177\u4f53\u64cd\u4f5c\u4e0e\u5148\u524d\u529f\u80fd\u5206\u6790\u4e00\u81f4\\n\\n> \u5728\u8ba1\u65f6\u5668\u5b8c\u6210\u540e\uff0c\u6709\u4e00\u90e8\u5206\u7279\u6b8a\u7684\u4ee3\u7801\uff0c\u8fd9\u662f\u4e3a\u4e86\u7528\u6765\u5904\u7406\u7b2c\u4e00\u6b21\u8fdb\u5165\u65f6\uff0cInterval \u4f1a\u7acb\u5373\u8fd4\u56de\uff08`Ready`\uff09\u8fd9\u6837\u5728\u4efb\u52a1\u5f00\u59cb\u65f6\u53ef\u4ee5\u8bb0\u5f55\u4e0b\u5f00\u59cb\u7684\u65f6\u95f4\u70b9\uff08`None` -> `Some(Instant)`\uff09\\n\\n\u5f53\u7136\u522b\u5fd8\u8bb0\uff0c\u5728\u5b9e\u73b0Future \u65f6\uff0c\u6211\u4eec\u9700\u8981\u8981\u6c42 `Fut` \u6cdb\u578b\u53c2\u6570\u5b9e\u73b0 `Future` \u548c `Recorder` \u6cdb\u578b\u53c2\u6570\u5b9e\u73b0 `FnMut(Duration)`\\n\\n## \u5468\u8fb9\u8f85\u52a9\\n\\n\u5bf9\u4e8e\u521a\u521a\u5b9a\u4e49\u7684 `TimeUsageRecordFuture` \u663e\u7136\u6211\u4eec\u4e0d\u5e0c\u671b\u7528\u6237\u80fd\u591f\u968f\u610f\u6784\u9020\uff08\u5982\u679c\u7528\u6237\u6784\u9020\u65f6\u76f4\u63a5\u4e3a `start_at` \u7ed9\u5b9a\u4e86\u5177\u4f53\u65f6\u95f4\u70b9\uff0c\u5c06\u4f1a\u4ea7\u751f\u9519\u8bef\u7684\u4efb\u52a1\u65f6\u957f\u8bb0\u5f55\uff09\u3002\u56e0\u6b64\uff0c\u6211\u4eec\u53ef\u4ee5\u63d0\u4f9b\u4e00\u4e2a `new` \u6784\u9020\u51fd\u6570\uff0c\u4ee5\u6b63\u786e\u5730\u521d\u59cb\u5316\u6211\u4eec\u7684 `Future`\\n\\n```rust\\nimpl<Fut, Recorder> TimeUsageRecordFuture<Fut, Recorder> {\\n    pub fn new(fut: Fut, recorder: Recorder, period: Duration) -> Self\\n    where\\n        Fut: Future,\\n        Recorder: FnMut(Duration),\\n    {\\n        Self {\\n            fut,\\n            timer: interval(period),\\n            recorder,\\n            start_at: None,\\n        }\\n    }\\n}\\n```\\n\\n\u53ea\u8981\u4ee5\u4e0a\u7b80\u5355\u7684\u4ee3\u7801\uff0c\u5c31\u80fd\u8fdb\u884c `TimeUsageRecordFuture` , \u5e76\u4e14\u80fd\u591f\u907f\u514d\u7528\u6237\u9519\u8bef\u7684\u6784\u9020\u5e26\u6765\u7684\u9519\u8bef\u884c\u4e3a\u3002\\n\\n\u4f46\u662f\uff0c`new` \u662f\u5173\u8054\u51fd\u6570\uff0c\u5bf9\u4e8e\u7545\u5feb\u7684\u94fe\u5f0f\u8c03\u7528\u5c31\u50cf\u7fe0\u7fe0\u8fde\u7eed\u6d53\u5bc6\u7684\u817f\u6bdb\u7a81\u7136\u65ad\u5f00\u4e86\uff0c\u662f\u76f8\u5f53\u4e0d\u8212\u670d\u7684\uff0c\u662f\u5426\u80fd\u591f\u5c06\u6784\u9020\u52a0\u5165\u94fe\u5f0f\u8c03\u7528\u5462\uff1f \u5f53\u7136\uff01\\n\\n\u6211\u4eec\u9700\u8981\u4e00\u4e2a `trait` \u5c31\u53eb `IntoTimeUsageRecordFuture`\u5427 , \u5bf9\u4e8e\u4efb\u610f `Future` \u5b9e\u73b0\u8fd9\u4e2a `trait`, \u8fd9\u6837\u5c31\u80fd\u5728\u94fe\u5f0f\u8c03\u7528\u4e2d\u76f4\u63a5\u4f7f\u7528\u5176\u4e2d\u7684\u63a5\u53e3\uff0c\u8fdb\u884c\u5982\u540c\u987a\u7740\u6c34\u6c34\u7684\u6bdb\u5438\u732b\u4e00\u6837\u8212\u9002\u7684\u94fe\u5f0f\u8c03\u7528\u3002\u5c31\u50cf\u4e0b\u9762\u8fd9\u6837\\n\\n```rust\\npub trait IntoTimeUsageRecordFuture: Future + Sized {\\n    fn time_usage_record<Func>(\\n        self,\\n        recorder: Func,\\n        period: Duration,\\n    ) -> TimeUsageRecordFuture<Self, Func>\\n    where\\n        Func: FnMut(Duration),\\n    {\\n        TimeUsageRecordFuture::new(self, recorder, period)\\n    }\\n}\\n\\nimpl<F> IntoTimeUsageRecordFuture for F where F: Future + Sized {}\\n```\\n\\n## \u7b80\u5355\u6d4b\u8bd5\\n\\n\u4e3a\u4e86\u6d4b\u8bd5\u4ee3\u7801\u662f\u5426\u80fd\u591f\u5982\u9884\u671f\u8fd0\u884c\uff0c\u6211\u7b80\u6613\u7f16\u5199\u4e86\u4e2a\u5355\u5143\u6d4b\u8bd5, \u5982\u4e0b\\n\\n```rust\\n#[tokio::test]\\nasync fn test() {\\n    sleep(Duration::from_secs(1))\\n        .time_usage_record(\\n            |usage| println!(\\"using time {}ms\\", usage.as_millis()),\\n            Duration::from_millis(100),\\n        )\\n        .await\\n}\\n```\\n\\n\u4ee5\u4e0b\u662f\u5355\u5143\u6d4b\u8bd5\u7684\u8f93\u51fa\\n\\n```bash\\nrunning 1 test\\nusing time 114ms\\nusing time 222ms\\nusing time 332ms\\nusing time 442ms\\nusing time 551ms\\nusing time 660ms\\nusing time 770ms\\nusing time 879ms\\nusing time 988ms\\ntest test ... ok\\n\\ntest result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 1.02s\\n```\\n\\n\u867d\u7136\u6709\u4e00\u5b9a\u8bef\u5dee\uff0c\u4f46\u662f\u53ef\u4ee5\u770b\u5230\u6211\u4eec\u7684\u4ee3\u7801\u6b63\u5982\u6211\u4eec\u9884\u671f\u8fd0\u884c\uff01\\n\\n> \u5355\u5143\u6d4b\u8bd5\u9700\u8981\u542f\u7528 `tokio` \u7684 `test-util` \u548c `macros` features\\n>\\n## \u5b8c\u6574\u4ee3\u7801\\n\\n\u4ee5\u4e0b\u4e3a\u5b8c\u6574\u7684\u4ee3\u7801\\n\\n```rust\\nuse std::{\\n    future::Future,\\n    pin::Pin,\\n    task::{Context, Poll},\\n    time::Duration,\\n};\\n\\nuse pin_project::pin_project;\\nuse tokio::time::{interval, sleep, Instant, Interval};\\n\\n#[pin_project]\\npub struct TimeUsageRecordFuture<Fut, Recorder> {\\n    #[pin]\\n    fut: Fut,\\n    timer: Interval,\\n    recorder: Recorder,\\n    start_at: Option<Instant>,\\n}\\n\\nimpl<Fut, Recorder> TimeUsageRecordFuture<Fut, Recorder> {\\n    pub fn new(fut: Fut, recorder: Recorder, period: Duration) -> Self\\n    where\\n        Fut: Future,\\n        Recorder: FnMut(Duration),\\n    {\\n        Self {\\n            fut,\\n            timer: interval(period),\\n            recorder,\\n            start_at: None,\\n        }\\n    }\\n}\\n\\nimpl<Fut, Recorder> Future for TimeUsageRecordFuture<Fut, Recorder>\\nwhere\\n    Fut: Future,\\n    Recorder: FnMut(Duration),\\n{\\n    type Output = Fut::Output;\\n\\n    fn poll(self: Pin<&mut Self>, cx: &mut Context<\'_>) -> std::task::Poll<Self::Output> {\\n        let this = self.project();\\n        match (this.fut.poll(cx), this.timer.poll_tick(cx)) {\\n            (ret @ Poll::Ready(_), _) => ret,\\n            (Poll::Pending, Poll::Ready(current_time)) => {\\n                this.timer.reset();\\n                if let Some(start_time) = *this.start_at {\\n                    let duration = current_time.duration_since(start_time);\\n                    (this.recorder)(duration)\\n                } else {\\n                    let _ = this.start_at.insert(current_time);\\n                }\\n                Poll::Pending\\n            }\\n            (Poll::Pending, Poll::Pending) => Poll::Pending,\\n        }\\n    }\\n}\\n\\npub trait IntoTimeUsageRecordFuture: Future + Sized {\\n    fn time_usage_record<Func>(\\n        self,\\n        recorder: Func,\\n        period: Duration,\\n    ) -> TimeUsageRecordFuture<Self, Func>\\n    where\\n        Func: FnMut(Duration),\\n    {\\n        TimeUsageRecordFuture::new(self, recorder, period)\\n    }\\n}\\n\\nimpl<F> IntoTimeUsageRecordFuture for F where F: Future + Sized {}\\n\\n#[tokio::test]\\nasync fn test() {\\n    sleep(Duration::from_secs(1))\\n        .time_usage_record(\\n            |usage| println!(\\"using time {}ms\\", usage.as_millis()),\\n            Duration::from_millis(100),\\n        )\\n        .await\\n}\\n```"}]}')}}]);