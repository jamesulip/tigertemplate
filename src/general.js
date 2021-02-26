/* eslint-disable no-unused-vars */
/* eslint-disable*/
import axios from 'axios'

import Echo from 'laravel-echo'
window.axios = axios;
window.axios.defaults.baseURL = `http://${process.env.VUE_APP_SERVER}:8000`;


export function initialize(store,router){

    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        
        const currentUser = store.state.currentUser;
        
        if(requiresAuth && !currentUser) {
            next('/login');
        } else if((to.path == '/login' || to.path == '/register') && currentUser) {
            next('/trail');
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

        // config_pusher(store.getters.currentUser.token)
    }
}
export function setAuthorization(token) {
    window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export function config_pusher(token){
   
    
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'myKey',
        wsHost: process.env.VUE_APP_SERVER,
        wsPort: 6001,
        disableStats: true,
        enabledTransports: ['ws'],
        authEndpoint: `http://jarvis2.test/cors/broadcasting/auth`,
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept:'application/json'
            }
        },
        forceTLS: false
    });
    
}