import { defineStore } from 'pinia'

export const userUserStore = defineStore('111',{
  // id:'user',
  state: () => ({
    menus: [{
      name:'测试1',
      fullPath:'111',
      meta:{
        fullPath: "/dashboard",
        icon: "icon-yibiaopan",
        title: "routes.dashboard.dashboard"
      }
    },{
      name:'测试2',
      fullPath:'222',
      meta:{
        fullPath: "/demos",
        icon: "icon-zhuomian",
        title: "routes.demo.demo"
      }
    }],
  }),
  getters: {
   
  },
})