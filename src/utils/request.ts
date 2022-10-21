import axios from 'axios';
import type { AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/modules/user'
//本地缓存
import { Storage } from '@/utils/Storage';
//引入token 的key
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
//引入提示
import { message as $message } from 'ant-design-vue'

//处理请求路径
import { uniqueSlash } from './urlUtils';



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

/** 真实请求的路径前缀 */
const baseApiUrl = process.env.VUE_APP_BASE_API;

/** mock请求路径前缀 */
const baseMockUrl = process.env.VUE_APP_MOCK_API;

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
        //清除所有
        window.localStorage.clear()
        //刷新当前页面
        window.location.reload()
        // to re-login
        // Modal.confirm({
        //   title: '警告',
        //   content: res.message || '账号异常，您可以取消停留在该页上，或重新登录',
        //   okText: '重新登录',
        //   cancelText: '取消',
        //   onOk: () => {
        //     localStorage.clear();
        //     window.location.reload();
        //   }
        // });
      }

      //throw other
      //& 交叉类型  错误类型Error 和 {code:any} 合并了  Error里面必须就得code
      const error = new Error(res.message || UNKNOWN_ERROR) as Error & {code:any}
      error.code = res.code
      return Promise.reject(error)
    }else {
      return res
    }
  },
  (error)=>{
    //处理422 或者 500 的错误异常提示 （感觉并没有处理422 500）    
                              //?? 和||有点像 但是 ?? 左为null undefined时，执行右边
    const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR
    $message.error(errMsg)
    error.message = errMsg
    return Promise.reject(error)
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

export const request = async <T = any>(
  config:AxiosRequestConfig,
  options:RequestOptions
):Promise<T> => {
  try {
    const { successMsg, errorMsg,permCode,isMock,isGetDataDirectly=true } = options
    //如果当前是需要鉴权的接口 并且没有权限的话 则终止请求发起
    if(permCode && useUserStore().perms){

    }

    //是mock数据的话，使用mock请求路径前缀
    const fullUrl = `${(isMock ? baseMockUrl : baseApiUrl)+config.url}`
    config.url = uniqueSlash(fullUrl)
    console.log('处理前的请求路径：',fullUrl);
    
    console.log('处理完的请求路径：',config.url);

    // if (IS_PROD) {
    //   // 保持api请求的协议与当前访问的站点协议一致
    //   config.url.replace(/^https?:/g, location.protocol);
    // }
    
    //service.request() 发请求
    const res = await service.request(config)
    successMsg && $message.success(successMsg)//成功消息存在的话执行提示
    errorMsg && $message.error(errorMsg) //失败消息存在的话执行提示
    return isGetDataDirectly ? res.data : res
  } catch (error:any) {
    return Promise.reject(error)
  }
}