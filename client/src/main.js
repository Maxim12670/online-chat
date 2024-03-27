import './assets/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router.js';

createApp(App).use(createPinia()).use(router).mount('#app');

const user = localStorage.getItem('userData');
if (user) {
  console.log(111)
  router.push('/')
} else {
  console.log(3333)
  router.push('/auth')
}
