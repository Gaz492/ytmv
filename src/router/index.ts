import { createRouter, createWebHistory } from 'vue-router'
import FourView from '../views/FourView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FourView',
      component: FourView
    }
  ]
})

export default router
