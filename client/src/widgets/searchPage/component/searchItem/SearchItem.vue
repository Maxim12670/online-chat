<template>
  <div class="search-item">
    <SpriteSVG />
    <div class="search-item__photo">
      <img src="@/shared/assets/image/pict.jpg" alt="avatar">
    </div>
    <div class="search-item__initials">
      Имя Фамилия
    </div>
    <div class="search-item__btns">
      <button class="search-item__btn">
        <svg class="nav-menu__icon">
          <use xlink:href="#message-icon"></use>
        </svg>
      </button>
      <button class="search-item__btn">
        <svg class="nav-menu__icon">
          <use xlink:href="#friends-icon"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { SpriteSVG } from '@/shared/ui/index';


</script>