import type { BaseResponse } from '@/utils/request'
import { request } from '@/utils/request'
/**
 * 登录
 */
export function login(data:API.LoginParams) {
  return request<BaseResponse<API.LoginParams>>({
    //config: AxiosRequestConfig<any>
    url:'login',
    method:'post',
    data
  },
  {
    isGetDataDirectly:false
  })
}
