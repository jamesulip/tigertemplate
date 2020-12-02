/* eslint-disable no-unused-vars */
import axios from 'axios'
window.axios = axios;
window.axios.defaults.baseURL = 'http://jarvis2.test/';
export function initialize(store,router){

    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        
        const currentUser = store.state.currentUser;
        if(requiresAuth && !currentUser) {
            next('/login');
        } else if((to.path == '/login' || to.path == '/register') && currentUser) {
            next('/');
        } else {
            next();
        }

    });
     
 
    axios.interceptors.response.use(null, (error) => {
        if (error.response.status == 401) {
            store.commit('logout');
            router.push('/login');
        }
        return Promise.reject(error);
    });

    if (store.getters.currentUser) {
     
        setAuthorization(store.getters.currentUser.token);
    }
}
export function setAuthorization(token) {
    
    window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

