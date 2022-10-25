import { request } from '@/utils/request';



//获取个人信息
export function getInfo() {
  return request<API.AdminUserInfo>({
    url: 'account/info',
    method: 'get',
  });
}

//获取菜单 menus  perms
export function permmenu() {
  return request<API.PermMenu>({
    url: 'account/permmenu',
    method: 'get',
  });
}
