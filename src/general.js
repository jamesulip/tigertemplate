/* eslint-disable no-unused-vars */
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000';
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

    if (store.getters.currentUser) {
        setAuthorization(store.getters.currentUser.token);
    }
}
export function setAuthorization(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

