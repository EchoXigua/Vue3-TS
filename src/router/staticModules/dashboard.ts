import type { RouteRecordRaw } from "vue-router";
import RouterView from '@/layout/routerView/index.vue';

import { t} from '@/hooks/useI18n'
import Welcome from '@/views/dashboard/welcome/index.vue'
const moduleName = 'dashboard'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/dashboard',
    name: moduleName,
    redirect:'/dashboard/welcome',
    component: RouterView,
    meta: {
      title: t('routes.dashboard.dashboard'),
      icon: 'icon-yibiaopan',
    },
    children:[
      {
        path:'welcome',
        name:`${moduleName}-welcome`,
        component:Welcome
      }
    ]
  }
]

export default routes;
