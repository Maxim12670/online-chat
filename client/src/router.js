import { createRouter, createWebHistory } from "vue-router";
import Main from "./widgets/main/ui/Main.vue";
import FormsContainer from "./widgets/formsContainer/ui/FormsContainer.vue";

const routers = [
  { name: 'Main', path: '/', component: Main },
  { name: 'FormsContainer', path: '/auth', component: FormsContainer }
]

export default createRouter({
  history: createWebHistory(),
  routes: routers
})

