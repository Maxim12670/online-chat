<template>
  <div class="user-page">

    <teleport to="body">
      <ModalWindow :showModalWindow="showModalWindow" @click="showModalWindow = false" />
    </teleport>

    <div class="user-page__content">
      <div class="user-page__photo">
        <img src="../../../shared/assets/image/pict.jpg" alt="logo">
      </div>
      <div class="user-page__descr">
        <div v-show="surname !== null" class="user-page__name">
          {{ surname + ' ' + name }}
        </div>
        <div v-show="email !== null" class="user-page__item">
          Почта: <span>{{ email }}</span>
        </div>
        <div class="user-page__item">
          Город: <span>Томск</span>
        </div>
        <div class="user-page__item">
          Возраст: <span>23</span>
        </div>


        <button class="user-page__btn" @click="showModalWindow = true">Редактировать профиль</button>

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

import { ref } from 'vue';
import { ModalWindow } from '@/shared/ui/index';
const showModalWindow = ref(false);


const userStore = useUserStore();
const { name, surname, email } = userStore.userData;


</script>