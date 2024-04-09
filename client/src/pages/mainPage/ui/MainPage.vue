<template>
  <content-container class="main-page__wrapper">
    <div class="main-page">
      <div class="main-page__menu">
        <nav-menu />
      </div>
      <div class="main-page__content">
        <router-view/>
        <!-- <user-view /> -->
        <!-- <search-view /> -->
      </div>
    </div>
  </content-container>
</template>

<script setup>
import './style.scss';
import { ContentContainer } from '../../../shared/ui/index.js';
import { NavMenu, UserView, SearchView } from '../../../widgets/index.js';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

</script>