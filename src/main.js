/* eslint-disable*/
import './assets/index.css'
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Pusher from "pusher-js"
import  VueEditor  from "vue2-editor";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import moment from 'moment'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago', 
  locale: 'en',
})
Vue.prototype.moment = moment
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import {initialize} from './general'

import PortalVue from 'portal-vue'

Vue.use(PortalVue)


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
Vue.component('send_message', require('./views/trail/sendmessage.vue').default);
Vue.component('updateButton', require('./components/updatebutton.vue').default);


import plugin from './plugin.js'
Vue.use(plugin)





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
