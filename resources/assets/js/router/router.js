// 所有路由信息的配置
import layout from 'views/layout'

export const mainRouter = [
  {
    path: '/',
    name: 'management',
    icon: 'arrow-move',
    component: layout,
    redirect: 'home',
    title: '管理页',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'home',
      icon: 'arrow-move',
      component: require('views/home/index'),
      title: '首页',
      name: 'home',
      meta: {
        title: 'home',
        noCache: true,
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
      {
        path: 'example',
        icon: 'arrow-move',
        component: require('views/home/index'),
        title: '实例页',
        name: 'example',
        meta: {
          title: 'example',
          icon: 'lock',
          noCache: true,
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }]
  },
];

export const constantRouterMap = [
  {
    path: '/login',
    component: require('views/login/index'),
    name: 'login',
  },
  {
    path: '/password/reset',
    component: require('views/login/password/email'),
    name: 'password.request',
  },
];

// 导出所有的路由配置
export const routes = [
  ...mainRouter,
  ...constantRouterMap
];
