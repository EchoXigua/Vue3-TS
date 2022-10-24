//定义ws仓库
import { defineStore } from "pinia"

import type { SocketIOWrapperType, SocketStatusType } from '@/core/socket/socket-io'

interface WsState {
  client: SocketIOWrapperType | null  ,//客户端
  status: SocketStatusType //状态
}

export const useWsStore = defineStore('ws',{
  state: ():WsState=>({
    // socket wrapper 实例
    client:null,
    //socket 连接状态
    status:'CLOSE'
  }),
  actions:{

  }

})