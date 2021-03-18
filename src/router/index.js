/* eslint-disable no-unused-vars */

import Vue from "vue";
import VueRouter from "vue-router";
import main from "../views/main.vue";
import Login from '../views/Login.vue'
import register from '../views/Register.vue'

import test from '../views/test.vue'

Vue.use(VueRouter);

const routes = [

  {
    path: "/",
    name: "home",
    component: main,
    meta: {
      requiresAuth: true
    },
    children: [{
        path: 'home',
        name: "home",
        component: () => import('../pages/home.vue'),
        meta: {
          requiresAuth: true
        }
      },

      {
        path: 'test/:detailid',
        name: "test",
        component: () => import('../views/test'),
        meta: {
          requiresAuth: true
        }
      },

      {
        path: "trail",

        component: () => import("../pages/client/clients.vue"),
        meta: {
          requiresAuth: true
        },
        children: [{
          path: "",
          name: 'trail',
          component: () => import("../views/trail/trail"),
          meta: {
            requiresAuth: true
          },
        }, {
          path: ":id",
          name: 'view_trail',
          component: () => import("../views/trail/trail_view"),
          meta: {
            requiresAuth: true
          },
        }]
      },


      {
        path: 'projects',
        name: "projects",
        component: () => import('../pages/projects.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'timeline',
        name: "timeline",
        component: () => import('../pages/stats/stat.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'projects/lr/:id',
        name: "lrsend",
        component: () => import('../pages/lr/send.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'trail',
        name: "trail",
        component: () => import('../views/trail/trail.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'delegate',
        name: "delegate",
        component: () => import('../pages/delegate.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'history',
        name: "history",
        component: () => import('../pages/history.vue'),
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