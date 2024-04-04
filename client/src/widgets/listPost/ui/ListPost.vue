<template>
  <div class="post">
    <div class="post__wrapper">
      <my-input class="post__input" type="text" placeholder="Напиши новый пост" />
      <my-button class="post__btn" type="submit" text="ок" />
    </div>
    <div class="post__list">
      <div class="post__item"></div>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { MyInput, MyButton } from '@/shared/ui';

</script>