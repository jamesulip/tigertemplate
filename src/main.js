/* eslint-disable*/

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Pusher from "pusher-js"
import  VueEditor  from "vue2-editor";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import moment from 'moment'
Vue.prototype.moment = moment
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
Vue.mixin({
  methods: {
    getInitial: function (name) {
      var initials = name.match(/\b\w/g) || [];
      initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
      return initials;
    },
    formatDate(val,format){
      return moment(val).format(format);
    }
  },
})

initialize(store,router)

store.commit('setServerUrl',`http://${process.env.VUE_APP_SERVER}:8000`)


Vue.component('loading1', require('./components/loaders/loading1.vue').default);
Vue.component('project_detail', require('./pages/project/project_detail.vue').default);
Vue.component('status_indicator', require('./components/custom/status_indicator.vue').default);
Vue.component('confirm_delete', require('./components/custom/confirm_delete.vue').default);
Vue.component('edit_psr', require('./pages/project/jopstlr/psr/project_psr_edit').default);
Vue.component('edit_jo', require('./pages/project/jopstlr/jo/project_jo_edit').default);
Vue.component('send_project', require('./components/custom/send_project').default);


Vue.filter('formatDate', function (value,format) {
  if(format=='ago')
    return moment(value).fromNow()
  else  
    return moment(value).format(format)
})
Vue.filter('bytesToSize', function (bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
