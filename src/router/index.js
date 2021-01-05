/* eslint-disable no-unused-vars */

import Vue from "vue";
import VueRouter from "vue-router";
import main from "../views/main.vue";
import Login from "../views/Login.vue";
import register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: main,
    meta: {
      requiresAuth: true
    },
    children: [{
        path: "home",
        name: "home",
        component: () => import("../pages/home.vue"),
        meta: {
          requiresAuth: true
        }
      },




      {
        path: "clients",
        component: () => import("../pages/clients/clients.vue"),
        meta: {
          requiresAuth: true
        },
        children: [{
            path: "",
            name: "clients",
            component: () => import("../pages/clients/clients_list.vue"),
            meta: {
              requiresAuth: true
            },
          },
          {
            path: ":id",
            name: "client_view",
            component: () => import("../pages/clients/clients_view.vue"),
            meta: {
              requiresAuth: true
            }
          }
        ]
      },





      {
        path: "trail",
        name: "trail",
        component: () => import("../views/trail/trail.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "delegate",
        name: "delegate",
        component: () => import("../pages/delegate.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "history",
        name: "history",
        component: () => import("../pages/history.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: register
  },
  {
    path: "*",
    component: {
      template: '<h1>Not found</h1>'
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;