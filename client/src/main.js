import './assets/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router.js';

createApp(App).use(createPinia()).use(router).mount('#app');

if (localStorage.getItem('isLogin')) {
  router.push('/')
} else {
  router.push('/auth')
}
