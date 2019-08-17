# koa2 从入坑到放弃

### 项目构建

tree 目录生成命令
```shell
tree> doc/tree.md -L 4 -I "node_modules"
brew install tree  ||  apt-get install tree
```

* tree -d 只显示文件夹； 
* tree -L n 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3； 
* tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用tree -I "node_modules"； 
* tree > tree.md 将项目结构输出到tree.md这个文件。

启动项目之前，先启动本地MongoDB和Redis服务器。

### MongoDB：
安装：mac下使用命令行`sudo brew install mongodb` 

检查：which mongod (windows 在gitbash中运行)

启动：sudo mongod(windows 在gitbash中运行)

可视化工具：Studio 3T

mongose：https://mongoose.shujuwajue.com/

### Redis：

安装：mac下使用命令行`sudo brew install redis` ,

windows 使用 `https://github.com/MicrosoftArchive/redis/releases`

启动：redis-server(windows 在gitbash中运行)

### 启动程序

npm run dev
使用下面接口查看程序有没有启动：
http://localhost:3000/users/test

### 日志管理

log4js接入及使用方法

### 文件上传

### Ramda
Ramda 一个函数式编程的库
可以学习阮一峰老师的这篇文章：
http://www.ruanyifeng.com/blog/2017/03/ramda.html

### token

###