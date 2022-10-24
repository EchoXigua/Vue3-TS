




export enum SocketStatus {
  // 连接中
  CONNECTING = 'CONNECTING',
  // 已连接
  CONNECTED = 'CONNECTED',
  // 已关闭
  CLOSE = 'CLOSE',
}

//socket 状态类型， keyof 获取某种类型的所有键,
/**
  let man:Person = {
    name:'xigua',
    age:18
  }
  typeof用于获取某种变量的类型

  type Human = typeof man   
   Human 的类型是 {
      name:string,
      age:number
   }
 */

//SocketStatusType 的类型就为 'CONNECTING' | 'CONNECTED' | 'CLOSE'
export type SocketStatusType = keyof typeof SocketStatus; 


//InstanceType，实例类型 实例身上的属性都要有，且类型一致  可用于获取构造函数的返回类型
/**  
 *  InstanceType<typeof Man>  
    class Man {
      name:string
      age:number
      constructor(){
        this.name = 'xiuga'
        this.age = 18
      }
      Hello(){
        console.log('hello world');
      }
    }
    type Human = InstanceType<typeof Man>
    let man:Human = {
      name:'xigua',
      age:18,
      Hello(){

      }
    }
 */
export type SocketIOWrapperType = InstanceType<typeof SocketIOWrapper>;

export class SocketIOWrapper {
  
}