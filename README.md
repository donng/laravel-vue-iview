# laravel-vue-iview

基于 laravel + vue 以及 [iview3](https://www.iviewui.com/) 前端ui的后台系统,开箱即用,可用于快速开发工程模块。

> 此项目的搭建过程可以访问[这里](https://segmentfault.com/a/1190000013212484)

## 开发

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
# 生产环境编译
npm run prod
```

## 项目截图

<p align="center">
  <img src='http://i2.bvimg.com/646005/22bad7fd57852453.jpg'>
  <img src='http://i2.bvimg.com/646005/c5e89ba1f72cc2e2.jpg'>
</p>

## 访问

```bash
php artisan serve
```

访问 http://127.0.0.1:8000

用户名和密码都是 `admin@admin.com`


