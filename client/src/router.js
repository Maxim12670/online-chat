import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "./pages/mainPage/ui/MainPage.vue";
import FormsPage from "./pages/formsPage/ui/FormsPage.vue";
import { UserView, SearchView, MessageView, FriendsView, ChatRoom } from "./widgets/index";
import { useMessageStore } from "./stores/messageStore";


const routers = [
  {
    name: 'MainPage', path: '/', component: MainPage,
    redirect: to => {return 'user'},
    children: [
      { name: 'user', path: '/user', component: UserView },
      { name: 'search', path: '/search', component: SearchView },
      {
        name: 'dialogs', path: '/dialogs', component: MessageView
      },
      {
        name: 'chat',
        path: '/chat/:id',
        component: ChatRoom,
        props: (route) => ({
          name: route.query.name,
          surname: route.query.surname
        }),
        beforeEnter: getDialogMessages
      },
      { name: 'friends', path: 'friends', component: FriendsView }
    ], beforeEnter: checkAuth
  },
  { name: 'FormsPage', path: '/auth', component: FormsPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers
});

function checkAuth(to, from, next) {
  if (localStorage.getItem('isLogin')) {
    next()
  } else {
    next('/auth')
  }
};

async function getDialogMessages(to, from, next) {
  const messageStore = useMessageStore();
  to.params.messages = await messageStore.getAllMessageDialog(to.params.id);
  next();
};

export default router;