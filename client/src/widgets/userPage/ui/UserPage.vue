<template>
  <div class="user-page">

    <div class="user-page__wrapper">
      <div class="user-page__photo">
        <img src="../../../shared/assets/image/pict.jpg" alt="logo">
      </div>
      <div class="user-page__descr">
        <div class="user-page__name">
          Акайкин Максим
        </div>
        <div class="user-page__item">
          Почта: <span>{{ userStore.userData }}</span>
        </div>
        <div class="user-page__item">
          Город: <span>Томск</span>
        </div>

        <button class="user-page__btn">Редактировать профиль</button>
      </div>
    </div>

    <div class="post">
      <div class="post__wrapper">
        <input type="text" class="post__input" placeholder="Написать новый пост">
        <button class="post__btn">OK</button>
      </div>
      <div class="post__list">
        <div class="post__item"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
console.log(userStore.userData.name + 1111)



</script>