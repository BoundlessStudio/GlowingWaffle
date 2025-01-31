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
      path: '/apis',
      name: 'apis',
      component: () => import('../views/ApisView.vue')
    },
    {
      path: '/apis/:id',
      name: 'api-details',
      component: () => import('../views/ApiDetailsView.vue')
    },
    {
      path: '/keys',
      name: 'keys',
      component: () => import('../views/KeysView.vue')
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('../views/AnalyticsView.vue')
    }
  ]
})

export default router