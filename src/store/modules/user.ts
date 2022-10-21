import { defineStore } from 'pinia'
import { login } from '@api/login'

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
    perms: []
  }),
  getters: {
   
  },
  actions:{
    /**登录 */
    async login(params){
      try {
        const { data } = await login(params) 
      } catch (error) {
        
      }
    }
  }
})