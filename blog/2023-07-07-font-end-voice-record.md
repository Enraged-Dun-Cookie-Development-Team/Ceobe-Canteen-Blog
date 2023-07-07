---
slug: 前端录音开发
title: 前端录音开发
authors: endi
tags: [Typescript, Vue]
---

由于某些需要，我需要在前端页面进行录音，并传递到后端。使用前端进行音频录制时，会有一定的注意事项，因此在简要介绍使用前端录音的大概流程，并简要介绍需要注意的要点。

## 在浏览器上取得麦克风权限相关接口:`MediaRecorder`

其实，与很多人认知中的不同，浏览器其实能提供相当丰富的多媒体输入资源。但是与安装在设备的应用程序不同，每次使用这些多媒体设备，需要进行权限申请并得到用户授权，否则将无法使用那些接口。同时，浏览器的安全策略同样也可能会使得某些看似可用的功能在某些情况下不可用。

在这里，我使用原生的 [`MediaRecorder`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder) 进行音频录制。但是观察其[构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder/MediaRecorder)，会注意到, 需要一个必选的`stream` 参数，这个就是将要用于录制的流。对于这个流，有多种取得方式

1. [`navigator.mediaDevices.getUserMedia()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia) 这个接口会返回一个 `Promise`,等待用户确认权限申请，并取得请求的[`MediaStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream), 这个`MediaStream`可以作为`MediaRecorder`的构造函数中的`stream`
2. DOM 元素 `<canvas>`、`<audio>` 和 `<vedio>`

而当 `MediaRecorder` 创建完毕后，接下来就比较容易了。 可以使用 `start()` 开始音频录制，使用 `stop()` 停止音频录制，然后提供事件 `ondataavailable`, `onstop`, `onstart` 等事件回调函数，看起来似乎一切其实并不复杂。

## 申请权限并录音

在这里，使用 vue + vuetify 作为框架，以能提供易于制作的前端页面。同时使用 typescript 编写，以保证能近似得到强类型语言的支持和安全感。

我使用的是 Vue 的组合式 API, 其中`<template>`部分如下

```html
<div>
  <v-container justify="center">
    <v-col sm="6" md="4" cols="auto">
      <v-btn @click="onQueryPermission">Request Audio Permission</v-btn>
    </v-col>
    <v-col sm="6" md="4" cols="auto">
      <v-btn v-if="mediaRecorder != null" @click="onRecordSwitch"
        >{{ inRecording ? "Stop" : "Start" }} Audio Recording</v-btn
      >
    </v-col>
    <audio v-if="audioURL != null" controls :src="audioURL"></audio>
  </v-container>
</div>
```

其中，包含 2 个按钮和 1 个音频播放器。

- 第一个按钮 `Request Audio Permission` 用于申请麦克风权限
- 第二个按钮 `Stop/Start Audio Recording` 用于执行录音的开始和停止
- 第三个播放器用于播放刚刚录制的音频内容

对于以上的 template 需要部分状态保持，如以下

```typescript
import { ref } from "vue";

// 在未取得用户授权，没有相应的录音器实例存在
const mediaRecorder = ref<null | MediaRecorder>(null);
// 当前是否正在进行录音
const inRecording = ref(false);
// 录音结果的URL
const audioURL = ref<null | string>(null);
// 录音结果的原始Blob
const audioBlob = ref<null | Blob>(null);
```

最后就是各个按键的回调函数部分

- `onQueryPermission` 向用户发起麦克风权限请求。如果用户许可，那就创建一个`MediaRecorder` 实例，以供后续使用。实现主要是为`MediaRecorder`实例添加 `ondataavailable`事件回调。在这个回调中，需要取得录音音频本体`Blob` 然后转换为`audio/ogg` 格式，最后生成 `audioURL` 供播放器使用

```typescript
const onQueryPermission = () => {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    let recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (ev) => {
      const blob = new Blob([ev.data], { type: "audio/ogg; codecs=opus" });
      var object_url = window.URL.createObjectURL(blob);
      audioURL.value = object_url;
      audioBlob.value = blob;

      console.log(`audio record done URL ${audioURL.value}`);
    };
    mediaRecorder.value = recorder;
  });
  console.log("media recorder create done");
};
```

- `onRecordSwitch` 用户点击用于开始/停止录音。当没有在录音时，点击该按键会开始录音，并重置部分状态。当正在录音时，点击该按键会停止录音。

```typescript
const onRecordSwitch = () => {
  if (inRecording.value) {
    mediaRecorder.value?.stop();
    inRecording.value = false;
  } else {
    audioBlob.value = null;
    audioURL.value = null;
    mediaRecorder.value?.start();
    inRecording.value = true;
  }
  console.log(`now record state is ${mediaRecorder.value?.state}`);
};
```

自此，基本版本的录音功能就已经完成了，但是还有些问题

## Edge: 录音结果不含有音频长度信息

在将音频上传到后端进行进一步处理时会发现，当用户使用 Edge 浏览器时，音频文件不包含长度信息，使得 ffmepg 等工具无法进行处理。而当用户使用 FireFox 时，却不会出现 Edge 中的问题，因此需要对音频时长进行修复

好消息是已经有能够修复缺少音频长度的 package 可以直接使用了，那对原有代码进行修改即可对音频进行长度进行修复，那个 package 名为 [`fix-webm-duration`](about:blank)

首先，现在我们的组件就需要添加一个记录录音开始时间的状态。并为`MediaRecorder` 提供`onstart` 和 `onstop` 的事件回调函数并修改 `ondataavailable` 回调函数。

- `onstart`： 记录开始录音时间
- `onstop`: 记录停止录音时间，并对音频进行修复，然后生成相应的`audioURL`
- `ondataavailable`: 将获得的音频`Blob` 放入 `audioBlob` 中，供后续处理

```typescript
// 录音开始时间
const startAt = ref(Date.now());
...

    recorder.onstart = () => {
      startAt.value = Date.now();
    };
    recorder.onstop = async () => {
      if (audioBlob.value != null) {
        const now = Date.now();
        const duration = now - startAt.value;
        const blob = await fixWebmDuration(audioBlob.value, duration);
        const blobOgg = new Blob([blob], { type: "audio/ogg; codecs=opus" });
        audioURL.value = window.URL.createObjectURL(blob);
        audioBlob.value = blobOgg;
        console.log(`audio record done URL ${audioURL.value}`);
      }
    };
    recorder.ondataavailable = (ev) => {
      audioBlob.value = ev.data;
    };
```

## FireFox & Edge 当使用 HTTP 协议并且服务器 IP 不是本地回环时，媒体资源不可用

在跨设备调试中，常常会将服务部署到局域网的 IP 和端口上，便于其他设备进行连接查看效果。但是通常情况，在这样的调试方式下不会使用 SSL 证书，因此提供的只是 HTTP 协议的服务。但是不论是对于 Firefox 还是 Edge , 当与服务器之间不是使用 HTTPS 协议并且 服务器不是在 `127.0.0.1` ， 媒体资源将变得完全不可用。 虽然出于安全考虑，这是正确的，但是却对调试带来了一定的麻烦。

### FireFox

当 Vue 项目在局域网内进行监听时，此时使用 FireFox 访问网站，试图请求麦克风权限时，会发现以下报错

```console
Uncaught TypeError: navigator.mediaDevices is undefined
```

这是由于使用的是 HTTP 协议而不是 HTTPS，因此，媒体设备相关的权限被火狐限制了。

在火狐的地址栏输入 `about:config` 在确认后，进入配置界面。

- 搜索并将以下配置项设置为`true`
  - `media.devices.insecure.enabled`
  - `media.getusermedia.insecure.enabled`
- 搜索并将前端的服务地址(如 `http://192.168.56.1:5173/`)添加到如下配置项中
  - `security.tls.insecure_fallback_hosts`

执行完成以上操作后，重启浏览器。会发现可以申请麦克风权限了

### Edge

当 Vue 项目在局域网内进行监听时，此时使用 Edge(或其他采用 Chromium 内核的浏览器) 访问网站，试图请求麦克风权限时，会发现以下报错

```console
Uncaught TypeError: Cannot read properties of undefined (reading 'getUserMedia')
```

原因与火狐类似，这里提供解决方法

在 Edge 地址栏输入 `edge://flags`,进入 flags 配置界面

找到配置项 `Insecure origins treated as secure`

- 将前端的服务地址(如 `http://192.168.56.1:5173/`)添加到文本框中
- 将这个配置项从 `disable` 切换为 `enable`

完成后，Edge 会提醒重启浏览器。重启浏览器后，就能申请麦克风权限了

## 完整代码

```html
<template>
  <div>
    <v-container justify="center">
      <v-col sm="6" md="4" cols="auto">
        <v-btn @click="onQueryPermission">Request Audio Permission</v-btn>
      </v-col>
      <v-col sm="6" md="4" cols="auto">
        <v-btn :disabled="mediaRecorder == null" @click="onRecordSwitch"
          >{{ inRecording ? "Stop" : "Start" }} Audio Recording</v-btn
        >
      </v-col>
      <v-col sm="6" md="4" cols="auto">
        <v-btn :disabled="audioURL == null">Upload</v-btn>
      </v-col>
      <audio v-if="audioURL != null" controls :src="audioURL"></audio>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import fixWebmDuration from "fix-webm-duration";
import { ref } from "vue";

// 在未取得用户授权，没有相应的录音器实例存在
const mediaRecorder = ref<null | MediaRecorder>(null);
// 当前是否正在进行录音
const inRecording = ref(false);
// 录音结果的URL
const audioURL = ref<null | string>(null);
// 录音结果的原始Blob
const audioBlob = ref<null | Blob>(null);
// 录音开始时间
const startAt = ref(Date.now());

const onQueryPermission = () => {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    let recorder = new MediaRecorder(stream);

    recorder.onstart = () => {
      startAt.value = Date.now();
    };
    recorder.onstop = async () => {
      if (audioBlob.value != null) {
        const now = Date.now();
        const duration = now - startAt.value;
        const blob = await fixWebmDuration(audioBlob.value, duration);
        const blobOgg = new Blob([blob], { type: "audio/ogg; codecs=opus" });
        audioURL.value = window.URL.createObjectURL(blob);
        audioBlob.value = blobOgg;
        console.log(`audio record done URL ${audioURL.value}`);
      }
    };

    recorder.ondataavailable = (ev) => {
      audioBlob.value = ev.data;
    };
    mediaRecorder.value = recorder;
  });
  console.log("media recorder create done");
};

const onRecordSwitch = () => {
  if (inRecording.value) {
    mediaRecorder.value?.stop();
    inRecording.value = false;
  } else {
    audioBlob.value = null;
    audioURL.value = null;
    mediaRecorder.value?.start();
    inRecording.value = true;
  }
  console.log(`now record state is ${mediaRecorder.value?.state}`);
};
</script>
```
