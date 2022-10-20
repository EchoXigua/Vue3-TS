import { createApp } from "vue";
import App from './App.vue'
import router from './router/index'
import { setupStore } from '@/store';

const app = createApp(App);

async function setupApp() {
  //挂载pinia
  setupStore(app)
  //挂载路由
  // await setupRouter(app)
  app.use(router)

  app.mount('#app')
}

setupApp()