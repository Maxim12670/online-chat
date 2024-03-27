import { createRouter, createWebHistory } from "vue-router";
import MainPage from "./pages/mainPage/ui/MainPage.vue";
import FormsPage from "./pages/formsPage/ui/FormsPage.vue"


const routers = [
  { name: 'MainPage', path: '/', component: MainPage },
  { name: 'FormsPage', path: '/auth', component: FormsPage }
]

export default createRouter({
  history: createWebHistory(),
  routes: routers
})

