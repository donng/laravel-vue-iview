// 所有路由信息的配置
import layout from 'views/layout'

/**
 * meta.title : 导航显示的中文名称
 * showParent : 无论子节量，都会显示为二级菜单（默认一个子节点只显示一级菜单）点数
 */

// 权限相关路由
export const mainRouter = [
  {
    path: '/',
    component: layout,
    redirect: 'home',
    children: [{
      path: 'home',
      component: require('views/home/index'),
      name: 'home',
      meta: {
        title: '首页',
        noCache: true,
        icon: 'md-home',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/components',
    component: layout,
    redirect: 'index',
    name: 'components',
    showParent: true,
    meta: {
      title: '公共组件',
      icon: 'md-construct'
    },
    children: [
      {
        path: 'index',
        component: require('views/components/index'),
        name: 'component',
        meta: {
          title: '图片上传',
          noCache: true,
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }]
  },
  {
    path: '/management',
    component: layout,
    redirect: 'example',
    name: 'management',
    showParent: true,
    meta: {
      title: '内容管理',
      icon: 'md-paper'
    },
    children: [
      {
        path: 'example',
        component: require('views/management/index'),
        name: 'example',
        meta: {
          title: '实例',
          noCache: true,
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }]
  },
];

// 无权限相关的路由
export const constantRouterMap = [
  { path: '/login', component: require('views/login/index') },
  { path: '/password/send', component: require('views/login/password/email') },
  { path: '/password/reset/:token', component: require('views/login/password/reset') },
];

// 导出所有的路由配置
export const routes = [
  ...mainRouter,
  ...constantRouterMap
];
