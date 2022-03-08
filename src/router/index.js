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
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      requiresAuth: false,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('isLogin') === 'true'){
        localStorage.setItem('isLogin',false);
      }
      next()
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: {
      requiresAuth: true,
    },
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.getItem('isLogin') === 'true'){
    //     if (localStorage.getItem('isAdmin') === 'true'){
    //       next();
    //     }
    //     else {
    //       next({name:'home'})
    //     }
    //   }
    //   else {
    //     next({name:'login'})
    //   }
    // }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
