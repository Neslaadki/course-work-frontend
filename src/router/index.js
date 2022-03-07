import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,

    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('isLogin') === 'true'){
        next();
      }
      else {
        next({name:'login'})
      }
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      requiresAuth: false,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('isLogin') === 'true'){
        localStorage.setItem('isLogin', false)
      }
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('isLogin') === 'true'){
        next();
      }
      else {
        next({name:'login'})
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
