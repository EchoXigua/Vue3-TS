import axios from 'axios';
import type { AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/modules/user'
//本地缓存
import { Storage } from '@/utils/Storage';
//引入token 的key
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
//引入提示
import { message as $message } from 'ant-design-vue'

export interface RequestOptions {
  /**当前接口权限，不需要鉴权的接口请忽略，格式：sys:user:add */
  permCode?:string; //可选参数
  /**是否直接获取data，而忽略message等 */
  isGetDataDirectly?:boolean;
  /**请求成功的提示信息 */
  successMsg?:string;
  /**请求失败的提示信息 */
  errorMsg?:string;
  /**是否mock数据请求 */
  isMock?:boolean;
}

const UNKNOWN_ERROR = '未知错误，请重试';

const service = axios.create({
  //baseURL:
  timeout:6000,//超时重连
})

//请求拦截器
service.interceptors.request.use(
  (config)=>{
    const token = Storage.get(ACCESS_TOKEN_KEY)
    if(token && config.headers){
      //请求头token信息，将token塞进请求头里面
      config.headers['Authorization'] = token
    }
    return config
  },  
  (error)=>{
    //发生错误直接抛出
    Promise.reject(error)
  }
)

//相应拦截器
service.interceptors.response.use(
  (response)=>{
    const res = response.data
    
    if(res.code!==200){
      $message.error(res.message || UNKNOWN_ERROR)

      // Illegal token 非法令牌
      if(res.code === 11001 || res.code === 11002){
        window.localStorage.clear()
        window.location.reload()
      }
    }
  }
)


export type Response<T = any> = {
  code:number,
  message:string,
  data:T
}

export type BaseResponse<T = any> = Promise<Response<T>>

/**
 * 
 */

export const request = <T = any>(
  config:AxiosRequestConfig,
  options:RequestOptions
):Promise<T> => {
  try {
    const { successMsg, errorMsg,permCode,isMock,isGetDataDirectly=true } = options
    //如果当前是需要鉴权的接口 并且没有权限的话 则终止请求发起
    if(permCode && useUserStore().perms){

    }
    const res = await
    return isGetDataDirectly ? res.data : res
  } catch (error) {
    
  }
}