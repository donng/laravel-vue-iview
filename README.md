# laravel-vue-iview



关于此项目的搭建的思路可以阅读这篇[博文](https://segmentfault.com/a/1190000013212484)。

[在线预览此项目](http://demo.donnebox.com)，线上地址的用户名和密码都是 `admin@admin.com`

## 简介

本项目基于 laravel、vue 以及 [iview3](https://www.iviewui.com/) 前端 ui 搭建，主要用于学习 vue 和 Laravel 的整合思路。

前端常用模块的开发不是本项目的重点，这方面已经有完成度较高的项目，没有必要再造轮子了，这方面需求请参照 iview 官方的前端项目：[iview-admin](https://github.com/iview/iview-admin)

项目主要内容：

- vuex 的使用
- router 配置和动态生成
- axios 封装和请求
- webpack.mix.js 的配置

## 安装

#### 安装扩展

```bash
# 克隆项目
git clone https://github.com/Donng/laravel-vue-iview.git

# 安装composer依赖
cd laravel-vue-iview && composer install

# 设置国内淘宝镜像（未设置的）
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 安装npm扩展包
cnpm install
```
#### 配置

```bash
# 复制配置文件
cp .env.example .env

# 生成加密key
php artisan key:generate

# 生成jwt加密key
php artisan jwt:secret

# 配置env中的数据库链接
配置数据库名称、用户名和密码

# 数据库迁移
php artisan db:seed
```

#### 编译

```bash
# 开发环境编译
npm run dev (或 npm run watch 监控文件修改)
# 生产环境编译，压缩JS文件
npm run prod
```
#### 访问项目

```bash
php artisan serve
```

访问 http://127.0.0.1:8000

用户名和密码都是 `admin@admin.com`

## 项目截图

<p align="center">
  <img src='http://image.donnebox.com/github/laravel-vue-iview-login.jpg'/>
  <img src='http://image.donnebox.com/github/laravel-vue-iview-dashboard.jpg'/>
</p>


## 文件结构

```
├── api  后端接口目录
├── components  公共组件库
├── images  图片资源
├── lang  多语言支持
├── libs  方法扩展库      
├── router  路由配置目录
├── store  vuex 配置
├── styles  样式库
├── utils  请求和公共方法封装
└── views  前端视图界面
```


