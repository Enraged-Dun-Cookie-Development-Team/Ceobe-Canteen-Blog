---
slug: 利用kubectl连接线上服务
title: 利用kubectl连接线上服务
tags: [k8s, deploy]
sidebar_position: 2
---
安装kubectl(k8s客户端)
:::tip
如果已经安装，直接跳转到[连接线上k8s](#连接线上k8s)
:::
### Windows安装与配置
- 下载kubectl
    - `curl.exe -LO "https://dl.k8s.io/release/v1.27.3/bin/windows/amd64/kubectl.exe"`
    - 或者点击 https://dl.k8s.io/release/v1.27.3/bin/windows/amd64/kubectl.exe 下载

    :::tip
    可通过链接 https://dl.k8s.io/release/stable.txt 查看最新版本kubectl下载
    :::

- 配置kubectl
    - 通过`打开文件资源管理器 -> 右键此电脑 -> 属性 -> 高级系统设置 -> 环境变量`打开环境变量
    - 点击`新建`，变量名输入`KUBECTL_HOME`，变量值添加kubectl下载路径的父文件夹
    ![新建环境变量](/img/docs/env-create.png)
    - 添加`%KUBECTL_HOME%`到`Path`环境变量中
    ![创建kubectl home环境变量](/img/docs/kubectl-home.png)
    - 打开`Terminal\Powershell\CMD`, 输入`kubectl version`检查是否配置成功
    ![检查kubectl-version配置](/img/docs/kubectl-version.png)

## 连接线上k8s
- 在`C:\Users\<username>`文件夹中，添加`.kube`文件夹
- 添加线上k8s连接配置的yaml文件到文件夹下，如果有多个k8s服务，可在`.kube`文件夹中分文件夹，再将yaml文件存于其底下
![添加k8s连接配置](/img/docs/k8s-config-yaml.png)
- 如上述所说，再次进入环境变量
- 点击`新建`，变量名输入`KUBECONFIG`，变量值输入yaml文件完整路径
![创建KUBECONFIG环境变量](/img/docs/kube-config-env.png)
- 打开`Terminal\Powershell\CMD`, 输入`kubectl get svc`检查是否配置成功
![检查连接配置](/img/docs/check-connect-k8s.png)

## 利用端口转发，连接线上服务
- 打开终端
- 输入`kubectl get namespace`, 获取所有的namespace
![获取k8s中namespace](/img/docs/kubectl-namespace.png)
- 利用前一个步骤获取的namespace， 输入`kubectl get svc -n <namespace>`，获取指定namespace下的服务的名字与端口
![获取k8s服务中namespace中名字与端口](/img/docs/kubectl-name-port.png)
- 输入`kubectl port-forward -n <namespace> svc/<service-name> <loacl-port>:<online-port>`将其转发到本地端口上
    - 如成功，将看到类似效果
        ```Powershell
        Forwarding from 127.0.0.1:7000 -> 6379
        Forwarding from [::1]:7000 -> 6379
        ```
- 这时候你就可以通过`127.0.0.1:<local-port>`来访问服务了