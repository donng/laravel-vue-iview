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
});

service.interceptors.response.use(response => {

  if (response.status === 401) {
    Message.error('登录失效，请重新登录!');
    store.dispatch('logout').then(() => {
      location.reload();
    });
  }

  return response.data;
});

export default service;
