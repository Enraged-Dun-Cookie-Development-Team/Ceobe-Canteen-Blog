# “很怪的笔记”

[![Netlify Status](https://api.netlify.com/api/v1/badges/0411fbff-939f-4af6-b671-500fb8da5299/deploy-status)](https://app.netlify.com/sites/ceobe-canteen-blog/deploys)
[![pnpm](https://img.shields.io/badge/pnpm-blue)](https://pnpm.io/)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-blueviolet)](https://docusaurus.io/)

博士捡到了一本笔记本，你有什么头猪吗？

## 笔记扉页

<div align="center">

![ceobo](./static/img/ceobo.png)

</div>

[Ceobe Blog](https://blog.ceobecanteen.top) 使用 [Docusaurus 2](https://docusaurus.io/) 构建！
包管理工具是 [pnpm](https://pnpm.io/) 哦！
日记交给 [Netlify](https://www.netlify.com/) 托管啦！

### 使用笔记本

想要写笔记吗？你要有笔记本哦！

```shell
#安装依赖
pnpm i
```

### 启动本地预览

博士说，写笔记前需要先打开日记本！

```shell
# 启动一个本地开发服务器，并打开一个浏览器窗口。
pnpm start
# 大多数更改都可以实时反映，无需重新启动服务器。
```

### 开始写咯

火神大姐说，新的日记要写在新的一页上！嗯！

#### 我想写日记

在 `blog` 目录下新建一个 `.md` 文件，取名为 `<YYYY>-<MM>-<DD>-<Title>.md`，然后开始写吧！

在文件开头加上以下内容：

```yaml
---
slug: <想要显示在侧边栏的文本>
title: <博客标题>
authors:
  name: <作者名字>
  title: <作者介绍>
  url: <作者链接>
  image_url: <作者头像链接>
  email: <作者邮箱>
tags: [<标签1>, <标签2>, ...]
---
```

更详细的用法小刻记在笔记本里啦！

#### 我想记笔记

在 `docs` 目录下新建一个 `.md` 文件，取名为 `<index>-<Title>.md`，然后开始写吧！

在文件开头加上以下内容：

```yaml
---
id: <文档id>
title: <文档标题>
tags: [<标签1>, <标签2>, ...]
---
```

更详细的用法小刻记在笔记本里啦！

### 日记写完啦

角峰大叔说写完的日记要保管好哦！

```shell
# 将更改推送到远程分支
# 假设你的更改正确的处于一个基于最新的 main 分支的 new-page 分支上
git add .
git commit -m ":memo: <日记标题>"
git push origin new-page
```

### 日记本要更新啦

好啦，日记写完啦，去告诉火神大姐他们吧！

```text
在GitHub上创建一个新的Pull Request，请求将你的更改合并到主分支
GitHub Actions将自动构建并生成更改的预览
合并后，Netlify将自动部署
```
