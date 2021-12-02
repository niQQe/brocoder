import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '../views/Main.vue'
import Start from '../views/start.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Start',
    component: Start,
  },
  {
    path: '/session/:id',
    name: 'Session',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Main
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
