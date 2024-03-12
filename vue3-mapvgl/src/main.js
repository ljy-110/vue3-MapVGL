import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
import './assets/css/common.scss';
import router from './router/index';
app.use(router);

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'dayjs/locale/zh-cn';
app.use(ElementPlus, {
  locale: zhCn
});

app.mount('#app');
