import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "./pages/mainPage/ui/MainPage.vue";
import FormsPage from "./pages/formsPage/ui/FormsPage.vue";
import { UserView, SearchView, MessageView, FriendsView } from "./widgets/index";



const routers = [
  {
    name: 'MainPage', path: '/', component: MainPage,
    children: [
      { path: 'user', component: UserView },
      { path: 'search', component: SearchView },
      {
        path: 'dialogs', component: MessageView
      },
      { path: 'friends', component: FriendsView }
    ]
  },
  { name: 'FormsPage', path: '/auth', component: FormsPage },
];

export default createRouter({
  history: createWebHashHistory(),
  routes: routers
})

