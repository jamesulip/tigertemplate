import Vue from "vue";
import Vuex from "vuex";
import {
  getLocalUser
} from '../js/login'
Vue.use(Vuex);


const user = getLocalUser();
export default new Vuex.Store({

  state: {
    currentUser: user,
    isLoggedIn: false,
    user: null
  },
  mutations: {
    loginSuccess(state, payload) {
      state.isLoggedIn = true;
      state.currentUser = Object.assign({}, payload.user, {
        token: payload.access_token
      });
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    logout(state) {
        localStorage.removeItem("user");
        state.isLoggedIn = false;
        state.currentUser = null;
    },
  },
  actions: {},
  modules: {},
  getters: {
    currentUser: state => {
      return state.currentUser
    }
  }
});