// 所有路由信息的配置
import layout from 'views/layout'

/**
 * meta.title : 导航显示的中文名称
 * showParent : 无论子节点数量，都会显示为二级菜单（默认一个子节点只显示一级菜单）
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
        icon: 'home',
        roles: ['admin']
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
      title: '管理页面',
      icon: 'easel'
    }, // you can set roles in root nav
    children: [
      {
        path: 'example',
        component: require('views/home/index'),
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
