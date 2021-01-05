import Vue from "vue";
import Vuex from "vuex";
import { getLocalUser } from "../js/login";
Vue.use(Vuex);
import axios from "axios";

const user = getLocalUser();
export default new Vuex.Store({
  state: {
    currentUser: user,
    isLoggedIn: false,
    user: null,
    page_loading: true,
    current_job: [],
    selected_project: {},
    my_projects: []
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
      localStorage.removeItem("user-token");
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    setLoading(state, payload) {
      state.page_loading = payload;
    },
    set_selected_project(state, payload) {
      state.selected_project = payload;
    },
    set_my_projects(state, payload) {
      state.my_projects = payload;
    }
  },
  actions: {
    set_current_job(state) {
      return new Promise((resolutionFunc, rejectionFunc) => {
        axios
          .get(`cors/current_project`)
          .then(res => {
            state.state.current_job = res.data;
            console.log("ss", state.current_job);
            resolutionFunc(res.data);
          })
          .catch(err => {
            console.error(err);
            rejectionFunc(err);
          });
      });
    }
  },
  modules: {},
  getters: {
    currentUser: state => {
      return state.currentUser;
    },
    loadingState: state => {
      return state.page_loading;
    },
    getCurrentJob: state => {
      return state.current_job;
    },
    getSelected_project: state => {
      return state.selected_project;
    },
    get_my_projects: state => {
      return state.my_projects;
    }
  }
});
