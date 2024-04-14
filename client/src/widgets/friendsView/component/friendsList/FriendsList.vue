<template>
  <div class="friends-list">
    <my-input v-model="searchString" class="friends-list__input" type="text" placeholder="Поиск" />
    <div class="friends-list__nav">
      <div v-for="item in nuvBtnValues" :key="item.value">
        <input :id="item.id" class="friends-list__radio" :checked="item.isChecked" type="radio" name="category-name"
          :value="item.value" v-model="filter">
        <label :for="item.id" class="friends-list__label">{{ item.labelText }}</label>
      </div>
    </div>

    <div class="friends-list__container">
      <div v-if="persons != 0">
        <friend-item v-for="person in persons" :key="person.id_found" :id="person.id_found" :type-case="filter"
          class="friends-list__item" />
      </div>

      <div v-else class="friends-list__wrapper">
        <SpriteSVG />
        <svg class="friends-list__icon">
          <use xlink:href="#absence-icon"></use>
        </svg>
        <h2 class="friends-list__title">Нет данных!</h2>
      </div>
    </div>

  </div>
</template>

<script setup>
import './style.scss';
import FriendItem from './component/FriendItem.vue';
import { MyInput, SpriteSVG } from '@/shared/ui';
import { ref } from 'vue';
import { computedAsync } from '@vueuse/core'
import { nuvBtnValues } from './config/nuvBtnValues';
import { useFriendsStore } from '@/stores/friendsStore.js';

const friendStore = useFriendsStore();
const searchString = ref('');
const filter = ref('friends');

const persons = computedAsync(async () => {
  if (filter.value == 'friends') {
    const arrayPersons = await friendStore.getAllFriends();
    if (searchString.value !== '') {
      return arrayPersons.filter((item) =>
        item.name.indexOf(searchString.value) !== -1 || item.surname.indexOf(searchString.value) !== -1)
    }
    return arrayPersons;

  } else if (filter.value == 'follower') {
    const arrayPersons = await friendStore.getAllFollowers();
    return arrayPersons;
  } else {
    const arrayPersons = await friendStore.getAllSubscriptions();
    return arrayPersons;
  }
});


</script>