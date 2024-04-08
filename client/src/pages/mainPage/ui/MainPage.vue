<template>
  <content-container class="main-page__wrapper">
    <div class="main-page">
      <div class="main-page__menu">
        <nav-menu />
      </div>
      <div class="main-page__content">
        <!-- <user-page /> -->
        <search-page />
      </div>
    </div>
  </content-container>
</template>

<script setup>
import './style.scss';
import { ContentContainer } from '../../../shared/ui/index.js';
import { NavMenu, UserPage, SearchPage } from '../../../widgets/index.js';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

</script>