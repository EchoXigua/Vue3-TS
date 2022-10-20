import { createApp } from "vue";
import App from './App.vue'
import { setupRouter }  from './router'
import { setupStore } from '@/store';
import { setupI18n } from '@/locales';

//引入setupAntd，讲一些组件注册到app上
import {setupAntd} from '@/plugins'

const app = createApp(App);

function setupPlugins() {
  //注册全局常用的ant-design-vue组件
  setupAntd(app)
}

async function setupApp() {
  //挂载pinia
  setupStore(app)
  //挂载路由
  await setupRouter(app)
  
  await setupI18n(app);
  app.mount('#app')
}
setupPlugins()

setupApp()