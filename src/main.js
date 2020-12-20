/* eslint-disable*/

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Pusher from "pusher-js"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";



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

Vue.mixin({
  methods: {
    getInitial: function (name) {
      var initials = name.match(/\b\w/g) || [];
      initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
      return initials;
    },
  },
})


initialize(store,router)



Vue.component('loading1', require('./components/loaders/loading1.vue').default);
Vue.component('project_detail', require('./pages/project/project_detail.vue').default);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// console.log(process.env.VUE_APP_SERVER)