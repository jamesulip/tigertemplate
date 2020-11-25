import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import axios from 'axios';

try {
  window.Popper = require('popper.js').default;
  window.$ = window.jQuery = require('jquery');
  require('admin-lte'); // Include AdminLTE
} catch (e) {
  console.log('error',e);
}
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = '127.0.0.1:8000/cors/auth/me';

import './general.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
