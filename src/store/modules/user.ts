import { defineStore } from 'pinia'
import { login } from '@/api/login'
//持久化存储的方法
import { Storage } from '@/utils/Storage';
//token
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum'; 
//引入ws
import { useWsStore } from './ws';




export const useUserStore = defineStore('user',{
  // id:'user',
  state: () => ({
    token: Storage.get(ACCESS_TOKEN_KEY,null), //从LocalStorage里面取token
    name:'amdin',
    avatar:'', //头像
    menus: [],
    perms: [],
    userInfo: {}
  }),
  getters: {
   
  },
  actions:{
     /** 清空token及用户信息 */
    resetToken() {
      this.avatar = this.token = this.name = '';
      this.perms = [];
      this.menus = [];
      this.userInfo = {};
      Storage.clear();
    },
    /** 登录成功保存token  持久化存储 */
    setToken(token: string) {
      this.token = token ?? '';
      const ex = 7 * 24 * 60 * 60 * 1000;
      Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
    },
    /**登录 */
    async login(params: API.LoginParams){
      try {
        const { data } = await login(params) 
        //data 里面有个token 登录返回一个token

        this.setToken(data.token)
        return this.afterLogin()        
      } catch (error) {
        return Promise.reject(error); //发生错误直接返回
      }
    },
     /** 登录成功之后, 获取用户信息以及生成权限路由 */
    afterLogin(){
      try {
        //websocket
        const wsStore = useWsStore()
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
})