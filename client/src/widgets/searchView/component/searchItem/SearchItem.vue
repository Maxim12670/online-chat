<template>
  <div class="search-item">
    <SpriteSVG />
    <div class="search-item__photo">
      <img src="@/shared/assets/image/pict.jpg" alt="avatar">
    </div>
    <div class="search-item__initials">
      {{ `${surname} ${name}` }}
    </div>
    <div class="search-item__btns">
      <button class="search-item__btn">
        <svg class="search-item__icon">
          <use xlink:href="#message-icon"></use>
        </svg>
      </button>
      <button class="search-item__btn">
        <svg class="search-item__icon">
          <use xlink:href="#friends-icon"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { SpriteSVG } from '@/shared/ui/index';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

defineProps({
  id: Number,
  name: String,
  surname: String
})

//добавить функционал - добавить в друзья
//добавить функиционал - написать сообщение

</script>