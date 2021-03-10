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
    page_loading: false,
    current_job: [],
    selected_project: {},
    my_projects: {
      current_page:''
    },
    current_project:{},
    projecttypes:[],
    productstep:[],
    productiontypes:[],
    machines:[],
    users:[],
    serUrl:"",
    trails:{
      data:[]
    },
    lr_list:{
      data:[]
    }
  },
  mutations: {
    setServerUrl(state, payload) {
      state.serUrl = payload;
    },
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
    },
    set_projects(state, payload) {
      state.current_project = payload;
    },
    set_projecttypes(state, payload) {
      
      state.projecttypes = payload;
    },
    set_productstep(state, payload) {
      
      state.productstep = payload;
    },
    set_productiontypes(state, payload) {
      
      state.productiontypes = payload;
    },
    set_machines(state, payload) {
      
      state.machines = payload;
    },
    set_trails_list(state, payload) {
      state.trails = payload;
    },
    set_lr(state, payload) {
      state.lr_list = payload;
    },
    set_users(s,p){
      s.users = p
    }
  },
  actions: {
    update_users({commit}){
      return axios.get(`cors/users`)
      .then(res => {
        commit('set_users',res.data)
      })
    
    },
    set_trails({ commit }) {
      return new Promise((resolutionFunc, rejectionFunc) => {
        axios.post(`cors/notifications2`)
        .then(res => {
          commit('set_trails_list',res.data)
        })
        .catch(err => {

        })


      });
    },
    set_lr({ commit },url) {
      return new Promise((resolutionFunc, rejectionFunc) => {
        if (url == 'refresh')
            url = this.current_url
        else if (url == 'search')
            url = this.page.path
        this.current_url = url
        axios.post(url, {search: this.search})
            .then(res => {
                this.lr = res.data
                commit('set_lr',res.data)
            })
            .catch(err => {
             
            })


      });
    },

    set_projecttypes_s({ commit }) {
      return new Promise((resolutionFunc, rejectionFunc) => {
        axios
          .get(`cors/projecttypes`)
          .then(res => {
            commit('set_projecttypes',res.data)
            resolutionFunc(res.data);
          })
          .catch(err => {
            console.error(err);
            rejectionFunc(err);
          });
      });
    },
    set_productstep({ commit }) {
      return new Promise((resolutionFunc, rejectionFunc) => {
        axios
          .get(`cors/productstep`)
          .then(res => {
            commit('set_productstep',res.data)
            resolutionFunc(res.data);
          })
          .catch(err => {
            console.error(err);
            rejectionFunc(err);
          });
      });
    },
    set_productiontypes({ commit }) {
      return new Promise((resolutionFunc, rejectionFunc) => {
        axios
          .post(`cors/productiontypes_get`,{
            type: "FOR"
          })
          .then(res => {
            commit('set_productiontypes',res.data)
            resolutionFunc(res.data);
          })
          .catch(err => {
            console.error(err);
            rejectionFunc(err);
          });
      });
    },
    set_machines({ commit }) {
      return new Promise((resolutionFunc, rejectionFunc) => {
        axios
          .get(`cors/machine-search?group=brand`)
          .then(res => {
            commit('set_machines',res.data)
            resolutionFunc(res.data);
          })
          .catch(err => {
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
    current_employee_id: state => {
      return state.currentUser.employee_id;
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
    },
    get_project: state => {
      return state.current_project;
    },
    get_projecttypes: state => {
      return state.projecttypes;
    },
    get_productstep: state => {
      return state.productstep;
    },
    get_productiontypes: state => {
      return state.productiontypes;
    },
    get_machines: state => {
      return state.machines;
    }
  }
});
