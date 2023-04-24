import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginUser from '../views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUser
  },
  {
    path: '/regUser',
    name: 'reguser',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegUser.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
    children: [
      {
        path: 'index',
        component: () => import('../views/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
