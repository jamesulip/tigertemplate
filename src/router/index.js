/* eslint-disable no-unused-vars */

import Vue from "vue";
import VueRouter from "vue-router";
import main from "../views/main.vue";
import Login from '../views/Login.vue'
import register from '../views/Register.vue'

Vue.use(VueRouter);

const routes = [
  
  {
    path: "/",
    name: "home",
    component: main,
    meta: {
        requiresAuth: true
    },
    children:[
      {
        path: 'home',
        name: "home",
        component: main,
        meta: {
            requiresAuth: true
        }
      },
    ]
  },
  
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});



export default router;
