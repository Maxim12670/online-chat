<template>
  <div class="search-list">
    <my-input class="search-list__input" v-model="filterString" placeholder="Поиск" type="text" :isRequired="false" />
    <div class="search-list__container">
      <search-item class="search-list__item" v-for="(person, index) in filterPersons" :key="index" :id="person.id"
        :name="person.name" :surname="person.surname" />
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { computed, onMounted, ref } from 'vue';
import { MyInput } from '@/shared/ui';
import SearchItem from '../searchItem/SearchItem.vue';
import { useUserStore } from '@/stores/userStore.js';


const userStore = useUserStore();
const filterString = ref('');
const persons = ref([]);

const filterPersons = computed(() => {
  if (filterString) {
    return persons.value.filter((person) => person.name.indexOf(filterString.value) !== -1 || person.surname.indexOf(filterString.value) !== -1)
  }
  return persons.value;
})

onMounted(async () => {
  persons.value = await userStore.getUsers();
})
</script>