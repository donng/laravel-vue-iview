import axios from 'axios'
import store from '@/store'
import { getToken } from './storage'
import { Message } from 'iview'

const service = axios.create({
  validateStatus: function (status) {
    return status <= 500
  }
});

service.interceptors.request.use(config => {

  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken();
  }

  return config;
}, error => {
  Promise.reject(error);
});

service.interceptors.response.use(response => {
  // 用户认证失败
  if (response.status === 401) {
    Message.error('登录失效，请重新登录!');
    store.dispatch('logout').then(() => {
      location.reload();// 为了重新实例化vue-router对象 避免bug
    });
  }

  return response.data;
});

export default service;
