import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/ephemerals',
      name: 'ephemerals',
      component: () => import('../views/EphemeralView.vue')
    }
  ]
})

export default router