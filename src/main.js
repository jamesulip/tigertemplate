/* eslint-disable*/

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Pusher from "pusher-js"
import  VueEditor  from "vue2-editor";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import vSelect from "vue-select";

Vue.component("v-select", vSelect);
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

Vue.use(VueEditor);


initialize(store,router)

store.commit('setServerUrl',`http://${process.env.VUE_APP_SERVER}:8000`)


Vue.component('loading1', require('./components/loaders/loading1.vue').default);
Vue.component('project_detail', require('./pages/project/project_detail.vue').default);
Vue.component('status_indicator', require('./components/custom/status_indicator.vue').default);
Vue.component('confirm_delete', require('./components/custom/confirm_delete.vue').default);
Vue.component('edit_psr', require('./pages/project/jopstlr/psr/project_psr_edit').default);
Vue.component('edit_jo', require('./pages/project/jopstlr/jo/project_jo_edit').default);
Vue.component('send_project', require('./components/custom/send_project').default);

import plugin from './plugin.js'
Vue.use(plugin)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
