// 导出路由并配置守卫
import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';

import { routes } from './router';

Vue.use(VueRouter);

// 创建并导出 router 实例，然后传 `routes` 配置
export const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
});


