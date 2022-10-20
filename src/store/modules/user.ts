import { defineStore } from 'pinia'

export const userUserStore = defineStore('111',{
  // id:'user',
  state: () => ({
    menus: [{
      name:'测试1',
      fullPath:'111'
    },{
      name:'测试2',
      fullPath:'222'
    }],
  }),
  getters: {
   
  },
})