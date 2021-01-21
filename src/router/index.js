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
    children: [

      {
        path: "",
        name: "home",
        component: () => import("../views/trail/trail.vue"),
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
       
        component: () => import("../pages/clients/clients.vue"),
        meta: {
          requiresAuth: true
        },
        children: [{
          path: "",
          component: () => import("../views/trail/trail"),
          meta: {
            requiresAuth: true
          },
        }, {
          path: ":id",
          name:'view_trail',
          component: () => import("../views/trail/trail_view"),
          meta: {
            requiresAuth: true
          },
        }]
      },
      {
        path: "projects",
        component: () => import("../pages/project/projects.vue"),
        meta: {
          requiresAuth: true
        },
        children: [{
            path: "",
            name: "projects",
            component: () => import("../pages/project/project_list.vue"),
            meta: {
              requiresAuth: true
            },
          },
          {
            path: ":id",
            name: "project_view",
            component: () => import("../pages/project/project_view.vue"),
            meta: {
              requiresAuth: true
            },
          },
        ]
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
  }, {
    path: "*",
    component: () => import('../pages/404.vue')
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;