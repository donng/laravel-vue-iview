// 导出路由并配置守卫
import Vue from 'vue';
import iView from 'iview';
import store from '../store'
import VueRouter from 'vue-router';

import { constantRouterMap } from './router';
import { getToken } from "utils/storage";

Vue.use(VueRouter);

// 创建并导出 router 实例，然后传 `routes` 配置
export const router = new VueRouter({
  routes: constantRouterMap
});

const whiteList = ['/login', '/password/send', '/password/reset'];

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();

  if (getToken()) {
    if (to.path === '/login') {
      next('/');
    } else {
      // 判断是否已获取用户信息
      if (store.getters.roles.length === 0) {
        store.dispatch('getUserInfo').then(user => {
          const roles = user.roles || ['admin'];
          store.dispatch('generateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            // next();
            next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          });
        });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      // 无 token 白名单可访问路由
      next();
    } else {
      next('/login');
      iView.LoadingBar.finish();
    }
  }
});

router.afterEach(() => {
  iView.LoadingBar.finish();
});


