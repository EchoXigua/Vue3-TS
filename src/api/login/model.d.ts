declare namespace API { 
  /**登录参数 */
  type LoginParams = {
    captchaId: string, //
    password: string,
    username: string,
    verifyCode:string //验证码
  }
}