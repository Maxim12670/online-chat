<template>
  <div class="friends-list">
    <my-input v-model="searchString" class="friends-list__input" type="text" placeholder="Поиск" />
    <div class="friends-list__nav">
      <div v-for="item in nuvBtnValues" :key="item.value">
        <input :id="item.id" class="friends-list__radio" :checked="item.isChecked" type="radio" name="category-name"
          :value="item.value" v-model="filterCase">
        <label :for="item.id" class="friends-list__label">{{ item.labelText }}</label>
      </div>
    </div>

    <loader-content v-if="!loadedPersons" class="friends-list__loader"/>
    <div v-else class="friends-list__container">
      <div v-if="persons != 0">
        <friend-item v-for="person in filterPerson" :key="person.id_found" :id="person.id" :name="person.name"
          :surname="person.surname" :image="person.image" :type-case="filterCase" class="friends-list__item" />
      </div>

      <not-data-stub v-else text="Нет данных!" class="friends-list__stub"/>
    </div>

  </div>
</template>

<script setup>
import './style.scss';
import FriendItem from './component/FriendItem.vue';
import { MyInput, NotDataStub, LoaderContent } from '@/shared/ui';
import { computed, provide, ref } from 'vue';
import { computedAsync } from '@vueuse/core'
import { nuvBtnValues } from './config/nuvBtnValues';
import { useFriendsStore } from '@/stores/friendsStore.js';
import { searchByStringInPerson } from '@/shared/lib/hooks/searchString';

const friendStore = useFriendsStore();
const searchString = ref('');
const filterCase = ref('friends');
const arrayPersons = ref([])
const loadedPersons = ref(false);

const filterPerson = computed(() => {
  return searchByStringInPerson(searchString.value, persons.value);
})

const persons = computedAsync(async () => {
  switch (filterCase.value) {
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

function deletePersonFromArray(idItem) {
  const indexItem = arrayPersons.value.findIndex(item => item.id === idItem);

  if(indexItem !== -1) {
    arrayPersons.value.splice(indexItem, 1);
  }
}

provide('deletePersonFromArray', deletePersonFromArray)

</script>