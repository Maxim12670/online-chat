<template>
  <content-container class="main-page__wrapper">
    <div class="main-page">
      <div class="main-page__menu">
        <nav-menu />
      </div>
      <div class="main-page__content">
        <!-- <router-view /> -->
        <!-- <message-view/> -->
        <friends-view/>
      </div>
    </div>
  </content-container>
</template>

<script setup>
import './style.scss';
import { ContentContainer } from '../../../shared/ui/index.js';
import {NavMenu, MessageView, FriendsView} from '@/widgets/index';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

</script>