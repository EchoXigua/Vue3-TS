import 'nprogress/css/nprogress.css' //进度条样式
import { createRouter, createWebHashHistory } from 'vue-router'

import { createRouterGuards } from './router-guards';
import { whiteNameList } from './constant';

import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import outsideLayout from './outsideLayout'

import Layout from '../layout/index.vue'
export const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'Layout',
    redirect: '/dashboard/welcome',
    component:Layout,
    meta: {
      title:'首页'
    },
    children:[]
  },
  ...outsideLayout
]

export const router = createRouter({
  history:createWebHashHistory(),
  routes
})

//rest router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !whiteNameList.some((n) => n === name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export async function setupRouter(app: App) {
  //创建路由守卫
  createRouterGuards(router, whiteNameList);

  app.use(router);

  // 路由准备就绪后挂载APP实例
  await router.isReady();
}

export default router