import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

//import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/PropagablePlantsView.vue')
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import(/* webpackChunkName: "auth" */ '../views/AuthView.vue')
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "profile" */ '../views/UserProfile.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "inventory" */ '../views/Inventory.vue')
  },
  {
    path: "/inventory/add",
    name: "addPlant",
    meta: {
      requiresAuth: true
    },
    component: () => import (/* webpackChunkName: "addPlant" */ '../views/AddPlant.vue')
  },
  {
    path: "/inventory/edit",
    name: "editPlant",
    meta: {
      requiresAuth: true
    },
    props: (route) => ({
      plant: route.params.plant,
      ...route.params
    }),
    component: () => import (/* webpackChunkName: "editPlant" */ '../views/EditPlant.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userLogged = (store.getters["user/token"]["logged"]);
  console.log('userLogged', userLogged);
  //Requires auth & no user
  if (requiresAuth && !userLogged) {
    next({name: "auth"});
    //Not requires auth and user (auth)
  } else if (!requiresAuth && userLogged) {
    next({ name: "home" });
  } else {
    //Anything else
    next();
  }
});

export default router;
