import { facts } from "@/assets/facts";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/fact/:id",
    name: "Fact",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Fact.vue"),
      beforeEnter: (to, _, next) => {
        const { id } = to.params

        if (Array.isArray(id)) {
          next({ path: '/error' })
          return
        }
  
        const index = parseInt(id)
        if (index < 0 || index >= facts.length) {
          next({ path: '/error' })
          return
        }
  
        next()
      }
  },
  {
    path: "/facts",
    name: "FactList",
    component: () => import('../views/FactList.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router