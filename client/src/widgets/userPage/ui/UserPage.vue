<template>
  <div class="user-page">

    <teleport to="body">
      <ModalWindow :show="show" />
    </teleport>

    <div class="user-page__content">
      <div class="user-page__photo">
        <img src="../../../shared/assets/image/pict.jpg" alt="logo">
      </div>
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
        <button class="user-page__btn" @click="show = !show">Редактировать профиль</button>
      </div>
    </div>
    <div class="user-page__post">
      <list-post></list-post>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { useUserStore } from '@/stores/userStore';
import { ListPost } from '@/widgets/index';
import { ref, computed } from 'vue';
import { ModalWindow } from '@/shared/ui/index';

const show = ref(false);
const userStore = useUserStore();
const userData = computed(() => userStore.userData)
</script>