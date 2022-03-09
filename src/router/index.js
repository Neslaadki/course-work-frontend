import {createRouter, createWebHistory} from 'vue-router'
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
            if (localStorage.getItem('isLogin') === 'true') {
                next();
            } else {
                next({name: 'login'})
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
                localStorage.setItem('isAdmin', false);
                localStorage.setItem('isCoor', false);
            localStorage.setItem('isManagerRC', false);
            localStorage.setItem('isManagerEmployee', false);
            localStorage.setItem('isRegistrator', false);
            localStorage.setItem('isManagerAwakeners', false);
            next()
        }
    },
    {
        path: '/coordinator',
        name: 'coordinator',
        component: () => import('../views/CoordinatorView.vue'),

        meta: {
            requiresAuth: true,
        },
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isCoor') === 'true') {
                next();
            } else {
                next({name: 'login'})
            }
        }
    },
    {
        path: '/manager_awakeners',
        name: 'manager_awakeners',
        component: () => import('../views/ManagerAwakenersView.vue'),

        meta: {
            requiresAuth: true,
        },
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isManagerAwakeners') === 'true') {
                next();
            } else {
                next({name: 'login'})
            }
        }
    },
    {
        path: '/manager_employee',
        name: 'manager_employee',
        component: () => import('../views/ManagerEmployeeView.vue'),

        meta: {
            requiresAuth: true,
        },
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isManagerEmployee') === 'true') {
                next();
            } else {
                next({name: 'login'})
            }
        }
    },
    {
        path: '/manager_rc',
        name: 'manager_rc',
        component: () => import('../views/ManagerRC.vue'),

        meta: {
            requiresAuth: true,
        },
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isManagerRC') === 'true') {
                next();
            } else {
                next({name: 'login'})
            }
        }
    },
    {
        path: '/registrator',
        name: 'registrator',
        component: () => import('../views/Registrator.vue'),

        meta: {
            requiresAuth: true,
        },
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isRegistrator') === 'true') {
                next();
            } else {
                next({name: 'login'})
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
        // beforeEnter: (to, from, next) => {
        //     if (localStorage.getItem('isAdmin') === 'true') {
        //         next();
        //     } else {
        //         next({name: 'login'})
        //     }
        // }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
