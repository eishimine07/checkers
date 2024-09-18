import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { name: 'checkers' }
  },
  {
    path: '/checkers',
    component: () => import('@/views/CheckersView..vue'),
    name: 'checkers',
    meta: { showHeaderAction: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
