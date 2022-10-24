import type { BaseResponse } from '@/utils/request'
import { request } from '@/utils/request'
/**
 * 登录
 */
export function login(data:API.LoginParams) {
  return request<BaseResponse<API.LoginResult>>({
    //config: AxiosRequestConfig<any>
    url:'login',
    method:'post',
    data
  },
  {
    isGetDataDirectly:false
  })
}

/**
 * 获取验证码
 */
export function getImageCaptcha(params?:API.CaptchaParams) {
  return request<API.CaptchaResult>({
    url:'captcha/img',
    method:'get',
    params
  })
}