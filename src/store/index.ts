import { createPinia } from 'pinia'
//创建pinia
import type {App} from 'vue'

const store = createPinia()

//暴露一个函数，将store注入app身上
export function setupStore(app:App<Element>) {
  app.use(store)
}
export {store}