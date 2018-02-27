// 所有路由信息的配置
import layout from 'views/layout'

// 权限相关路由
export const mainRouter = [
  {
    path: '/add',
    component: layout,
    redirect: 'dashboard',
    name: 'dashbord',
    children: [{
      path: 'dashboard',
      component: require('views/home/index'),
      name: 'dashboard',
      meta: {
        title: '首页',
        noCache: true,
        icon: 'arrow-move'
      }
    }]
  },
  {
    path: '/',
    name: 'management',
    component: layout,
    redirect: 'home',
    name: 'management',
    meta: {
      roles: ['admin'],
      title: '管理页面',
      icon: 'arrow-move'
    }, // you can set roles in root nav
    children: [
      {
        path: 'home',
        component: require('views/home/index'),
        name: 'home',
        meta: {
          title: '首页',
          icon: 'arrow-move',
          noCache: true,
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'example',
        icon: 'arrow-move',
        component: require('views/home/index'),
        name: 'example',
        meta: {
          title: '实例',
          icon: 'arrow-move',
          noCache: true,
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }]
  },
];

// 无权限相关的路由
export const constantRouterMap = [
  { path: '/login', name: 'login', component: require('views/login/index') },
  { path: '/password/reset', name: 'password.request', component: require('views/login/password/email') },
  { path: '/password/reset/:token', name: 'password.reset', component: require('views/login/password/reset') },
];

// 导出所有的路由配置
export const routes = [
  ...mainRouter,
  ...constantRouterMap
];
