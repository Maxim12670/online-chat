import { createRouter, createWebHistory } from "vue-router";
import MainPage from "./pages/mainPage/ui/MainPage.vue";
import FormsPage from "./pages/formsPage/ui/FormsPage.vue";
import { UserView, SearchView, MessageView } from "./widgets/index";



const routers = [
  {
    name: 'MainPage', path: '/', component: MainPage,
    children: [
      { path: 'user', component: UserView, meta: { default: true } },
      { path: 'search', component: SearchView },
      { path: 'message', component: MessageView }
    ]
  },
  { name: 'FormsPage', path: '/auth', component: FormsPage },
];

export default createRouter({
  history: createWebHistory(),
  routes: routers
})

