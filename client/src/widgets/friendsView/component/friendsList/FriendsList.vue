<template>
  <div class="friends-list">
    <my-input v-model="searchString" class="friends-list__input" type="text" placeholder="Поиск" />

    <div class="friends-list__nav">

      <input id="all" class="friends-list__radio" checked type="radio" name="category-name" value="all"
        v-model="filterList">
      <label for="all" class="friends-list__label">Друзья</label>

      <input id="request" class="friends-list__radio" type="radio" name="category-name" value="request"
        v-model="filterList">
      <label for="request" class="friends-list__label">Запросы</label>

      <input id="subscription" class="friends-list__radio" type="radio" name="category-name" value="subscription"
        v-model="filterList">
      <label for="subscription" class="friends-list__label">Подписки</label>

    </div>

    <div class="friends-list__container">
      <div v-if="filterList === 'all'">
        all friends
        <friend-item />
      </div>
      <div v-else-if="filterList === 'request'">
        request
        <friend-item />
      </div>
      <div v-else-if="filterList === 'subscription'">
        subscription
        <friend-item />
      </div>
    </div>

  </div>
</template>

<script setup>
import './style.scss';
import FriendItem from './component/FriendItem.vue';
import { MyInput } from '@/shared/ui';
import { ref } from 'vue';

const searchString = ref('');
const filterList = ref('all');



</script>