import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[] = [
  {
    path: '',
    name: 'Home',
    component: () => import('../container/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../container/About.vue')
  },
]

export default function genRouter(base?:string) {
  return createRouter({
    history: createWebHistory(base),
    routes,
  })
}
