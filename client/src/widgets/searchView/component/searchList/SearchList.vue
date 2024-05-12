<template>
  <div class="search-list">
    <my-input class="search-list__input" v-model="filterString" placeholder="Поиск" type="text" :isRequired="false" />
    <loader-content v-if="!loadedPersons" class="search-list__loader" />
    <div v-else class="search-list__container">
      <not-data-stub v-if="!filterPersons.length" text="Нет данных" />
      <search-item v-else class="search-list__item" v-for="(person, index) in filterPersons" :key="index"
        :id="person.id" :name="person.name" :surname="person.surname" :image="person.image" />
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { computed, onMounted, ref } from 'vue';
import { MyInput, NotDataStub, LoaderContent } from '@/shared/ui';
import SearchItem from '../searchItem/SearchItem.vue';
import { searchByStringInPerson } from '@/shared/lib/hooks/searchString';
import { useUserStore } from '@/stores/userStore.js';

const userStore = useUserStore();
const filterString = ref('');
const persons = ref([]);
const loadedPersons = ref(false);

const filterPersons = computed(() => {
  return searchByStringInPerson(filterString.value, persons.value)
});

onMounted(async () => {
  persons.value = await userStore.getUsers(userStore.userData.id);
  loadedPersons.value = true;
})
</script>