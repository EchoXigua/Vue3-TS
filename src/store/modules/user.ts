import { defineStore } from 'pinia'
import { login } from '@/api/login'
import { getInfo, permmenu } from '@/api/account'
//持久化存储的方法
import { Storage } from '@/utils/Storage';
//token
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum'; 
//引入ws
// import { useWsStore } from './ws';

import type { RouteRecordRaw } from 'vue-router';

//生成路由的方法
import { generatorDynamicRouter } from '@/router/generator-router'

//定义state返回值的类型，不然后面赋值的时候会报错
interface UserState {
  token: string;
  name: string;
  avatar: string;
  perms: string[];
  menus: RouteRecordRaw[];
  userInfo: Partial<API.AdminUserInfo>;
}

export const useUserStore = defineStore('user',{
  // id:'user',
  state: (): UserState => ({
    token: Storage.get(ACCESS_TOKEN_KEY,null), //从LocalStorage里面取token
    name:'amdin',
    avatar:'', //头像
    menus: [],
    perms: [],
    userInfo: {}
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getName(): string {
      return this.name;
    },
    getPerms(): string[] {
      return this.perms;
    },
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
    async afterLogin(){
      try {
        //websocket
        // const wsStore = useWsStore()

        
        const [userInfo,{ perms, menus }] =  await Promise.all([getInfo(),permmenu()])
        this.perms = perms;
        this.name = userInfo.name;
        this.avatar = userInfo.headImg;
        this.userInfo = userInfo;
        //生成路由
        const generatorResult = await generatorDynamicRouter(menus)
        this.menus = generatorResult.menus.filter((item) => !item.meta?.hideInMenu);

        // !wsStore.client && wsStore.initSocket();
        return { menus, perms, userInfo };
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
})