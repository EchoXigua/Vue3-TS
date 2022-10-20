import 'nprogress/css/nprogress.css' //进度条样式
import { createRouter, createWebHashHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import Layout from '../layout/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'Layout',
    redirect: '/dashboard/welcome',
    component:Layout,
    meta: {
      title:'首页'
    },
    children:[]
  }
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})
export async function setupRouter(app: App) {
  // 创建路由守卫
  // createRouterGuards(router, whiteNameList);

  app.use(router);

  // 路由准备就绪后挂载APP实例
  await router.isReady();
}

export default router