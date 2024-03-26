<template>
  <div class="authorization">
    <div class="authorization__wrapper">
      <div class="switcher">
        <label :class="{ 'switcher__label-active': isLogin }" @click="isLogin = !isLogin" class="switcher__label">
          Авторизация
        </label>
        <label :class="{ 'switcher__label-active': !isLogin }" @click="isLogin = !isLogin" class="switcher__label">
          Регистрация
        </label>
      </div>

      <div class="authorization__forms">
        <form-login v-if="isLogin" />
        <form-register v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { ref } from 'vue';
import FormLogin from './FormLogin.vue';
import FormRegister from './FormRegister.vue';

const isLogin = ref(true);



</script>