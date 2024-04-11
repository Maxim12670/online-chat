<template>
  <div class="friend-item">
    <SpriteSVG />
    <img class="friend-item__photo" src="@/shared/assets/image/pict.jpg" alt="avatar">
    <div class="friend-item__initials">
      Name Surname
    </div>
    <div class="friend-item__wrapper">
      <button class="friend-item__btn">
        <svg class="nav-menu__icon">
          <use xlink:href="#message-icon"></use>
        </svg>
      </button>
      <button class="friend-item__btn">
        <!-- удалитьб отменить, отказать -->
        <svg class="nav-menu__icon">
          <use xlink:href="#basket-icon"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { SpriteSVG } from '@/shared/ui';
</script>