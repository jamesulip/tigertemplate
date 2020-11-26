/* eslint-disable no-unused-vars */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import axios from 'axios';
import {initialize} from './general'
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


initialize(store,router)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
