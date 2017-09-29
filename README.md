# vue-blog

> A Vue.js project

## 技术栈
    vue(vue+vuex+vue-router+vue-resource)
    express
    mongoose

## 简介
  项目是为了内部使用，mongoose是现学现卖，后面发现api功能丰富，挺好用。

## 功能
    1、登录注册
    2、发布文章
    3、删除、修改文章
    4、查询（n个关键字查询+tag查询）
    5、tag添加、删除
  
## 项目启动：
    1、需要安装mongdb，并启动mongdb的服务
    2、进入项目  cd server下  执行node index；启动项目的server，提示Mongo connection successed，就可以正式使用
    3、在项目下执行 npm run start可看
  
##  结构简介
    1、直接使用vue-cli创建
    2、server文件夹下为接口服务相关代码
    3、src下为项目源代码，包含路由、组件和store文件夹。
    4、使用localStorge数据持久

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
