import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/app1',
    },
    {
      path: '/app1',
      component: h('div'),
    },
    {
      path: '/app2',
      component: h('div'),
    },
  ],
})
