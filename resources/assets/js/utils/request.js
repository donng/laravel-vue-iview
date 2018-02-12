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
  console.log(error); // for debug
  Promise.reject(error);
});

service.interceptors.response.use(response => {
  if (response.status === 401) {
    // 用户登录认证失败
    Message.error('邮箱地址或密码错误!');
    return false;
  }

  return response.data;
});

export default service;
