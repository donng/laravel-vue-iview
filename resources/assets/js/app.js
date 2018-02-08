
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import App from './app.vue'
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(VueRouter);

// The routing configuration
const RouterConfig = {
    routes: [
        { path: '/', component: require('./components/ExampleComponent.vue') },
    ]
};
const router = new VueRouter(RouterConfig);

const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
