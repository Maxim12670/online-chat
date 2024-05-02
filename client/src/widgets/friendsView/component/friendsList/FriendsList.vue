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

    <loader-content v-if="!loadedPersons" class="friends-list__loader"/>
    <div v-else class="friends-list__container">
      <div v-if="persons != 0">
        <friend-item v-for="person in persons" :key="person.id_found" :id="person.id" :name="person.name"
          :surname="person.surname" :image="person.image" :type-case="filter" class="friends-list__item" />
      </div>

      <not-data-stub v-else text="Нет данных!" class="friends-list__stub"/>
    </div>

  </div>
</template>

<script setup>
import './style.scss';
import FriendItem from './component/FriendItem.vue';
import { MyInput, NotDataStub, LoaderContent } from '@/shared/ui';
import { ref } from 'vue';
import { computedAsync } from '@vueuse/core'
import { nuvBtnValues } from './config/nuvBtnValues';
import { useFriendsStore } from '@/stores/friendsStore.js';

const friendStore = useFriendsStore();
const searchString = ref('');
const filter = ref('friends');
const arrayPersons = ref([])
const loadedPersons = ref(false);

const persons = computedAsync(async () => {
  switch (filter.value) {
    case 'friends':
      arrayPersons.value = await friendStore.getAllFriends();
      loadedPersons.value = true;
      return arrayPersons.value;
    case 'follower':
      arrayPersons.value = await friendStore.getAllFollowers();
      loadedPersons.value = true;
      return arrayPersons.value;
    case 'subscription':
      arrayPersons.value = await friendStore.getAllSubscriptions();
      loadedPersons.value = true;
      return arrayPersons.value;
  }
});

</script>