// 所有路由信息的配置

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

// 导出所有的路由配置
export const routes = [
    loginRouter
];
