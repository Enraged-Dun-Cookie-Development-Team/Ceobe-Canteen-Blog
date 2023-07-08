---
slug: 将github私有npm包添加到项目
title: 将github私有npm包添加到项目
tags: [npm, js, ts]
sidebar_position: 3
---

## github生成token

- 点击 [github token](https://github.com/settings/tokens) 进入token界面
- 点击 `Generate new token -> Generate new token(classic)` 创建新的token
  ![生成新token](/img/docs/generate-token.png)
- 根据图片配置生成token
  ![github token配置](/img/docs/github-token-config.png)
  ![生成github token](/img/docs/generate-github-token.png)
- 点击复制新生成的token
  ![复制token](/img/docs/copy-github-token.png)

## 将token添加到npm配置

- 获取npm配置文件位置
  ![npm配置路径](/img/docs/npm-config-path.jpg)
- 添加token到npm配置

  ```bash
  //npm.pkg.github.com/:_authToken=<TOKEN>
  <组织名称，如@enraged-dun-cookie-development-team>:registry=https://npm.pkg.github.com
  ```

  ![添加token到npm配置](/img/docs/token-to-npm-config.png)

## 引入npm包

- 在项目`package.json`文件中引入npm包
