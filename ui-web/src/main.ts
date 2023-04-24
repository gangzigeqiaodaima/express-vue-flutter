import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import http from './httpConfig';
// 引入全局样式
import "./styles.scss";

const app = createApp(App);

// 将 Axios 实例注入到应用中
app.provide('$http', http);

// 整体引入elementUI库
app.use(ElementPlus);

// 图标全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).mount('#app');

