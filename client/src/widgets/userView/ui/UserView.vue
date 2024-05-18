<template>
  <div class="user-page">

    <teleport to="body">
      <ModalWindow :show="show" />
    </teleport>

    <div class="user-page__content">
      <user-avatar class="user-page__photo" :image="userData.image" />
      <button class="user-page__exit" @click="logoutAccount">
        <svg class="user-page__exit-icon">
          <use xlink:href="#logout-account-icon"></use>
        </svg>
      </button>
      <div class="user-page__descr">
        <div v-show="userData.surname !== null" class="user-page__name">
          {{ userData.surname + ' ' + userData.name }}
        </div>
        <div v-show="userData.email !== null" class="user-page__item">
          Почта: <span>{{ userData.email }}</span>
        </div>
        <div v-show="userData.city !== null" class="user-page__item">
          Город: <span>{{ userData.city }}</span>
        </div>
        <div v-show="userData.age !== null" class="user-page__item">
          Возраст: <span>{{ userData.age }}</span>
        </div>
        <my-button class="user-page__btn" @click="show = !show" text="Редактировать профиль" />
      </div>
    </div>
    <div class="user-page__post">
      <list-post></list-post>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { ListPost } from '@/widgets/index';
import { ModalWindow, MyButton, UserAvatar } from '@/shared/ui/index';

const show = ref(false);
const userStore = useUserStore();
const userData = computed(() => userStore.userData);

const logoutAccount = async () => {
  await userStore.logout();
}
</script>