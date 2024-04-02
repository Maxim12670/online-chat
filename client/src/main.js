import './assets/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router.js';

createApp(App).use(createPinia()).use(router).mount('#app');

const user = localStorage.getItem('userData');
if (user) {
  router.push('/')
} else {
  router.push('/auth')
}
