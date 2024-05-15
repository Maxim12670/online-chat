import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "./pages/mainPage/ui/MainPage.vue";
import FormsPage from "./pages/formsPage/ui/FormsPage.vue";
import { UserView, SearchView, MessageView, FriendsView, ChatRoom } from "./widgets/index";
import { useMessageStore } from "./stores/messageStore";


const routers = [
  {
    name: 'MainPage', path: '/', component: MainPage,
    meta: { title: 'Главная' },
    redirect: to => { return 'user' },
    children: [
      {
        name: 'user', path: '/user', component: UserView, meta: { title: 'Главная' }
      },
      {
        name: 'search', path: '/search', component: SearchView, meta: { title: 'Поиск' }
      },
      {
        name: 'dialogs', path: '/dialogs', component: MessageView, meta: { title: 'Сообщения' }
      },
      {
        name: 'chat',
        path: '/chat/:id',
        component: ChatRoom,
        meta: { title: 'Чат' },
        props: (route) => ({
          name: route.query.name,
          surname: route.query.surname
        }),
        beforeEnter: getDialogMessages
      },
      {
        name: 'friends', path: 'friends', component: FriendsView, meta: { title: 'Друзья' }
      }
    ]
  },
  {
    name: 'FormsPage', path: '/auth', component: FormsPage, meta: { title: 'Авторизация' }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'Какая-то страница'
  }
  next();
})

async function getDialogMessages(to, from, next) {
  const messageStore = useMessageStore();
  to.params.messages = await messageStore.getAllMessageDialog(to.params.id);
  next();
};

export default router;