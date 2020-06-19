//require('./bootstrap');

import Vue from 'vue';

import App from './app.vue'
import store from './store'
import i18n from './lang'
import { router } from './router'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

const app = new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App)
});
