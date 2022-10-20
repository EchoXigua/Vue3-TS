import 'nprogress/css/nprogress.css' //进度条样式
import { createRouter, createWebHashHistory } from 'vue-router'


import type { RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
// import type { App } from 'vue'
const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    component:Layout
  }
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router