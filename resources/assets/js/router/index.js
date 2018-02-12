// 导出路由并配置守卫
import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';

import { routes } from './router';
import { getToken } from "utils/storage";

Vue.use(VueRouter);

// 创建并导出 router 实例，然后传 `routes` 配置
export const router = new VueRouter({
  routes
});

const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (getToken()) {
    if (to.path === '/login') {
      next('/');
    } else {
      // 判断是否已获取用户信息
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      // 无 token 白名单可访问路由
      next();
    } else {
      next('/login');
    }
  }
});

router.afterEach(() => {
  iView.LoadingBar.finish();
});


