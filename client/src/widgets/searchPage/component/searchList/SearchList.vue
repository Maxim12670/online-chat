<template>
  <div class="search-list">
    <my-input class="search-list__input" v-model="searchValue" placeholder="Поиск" 
      type="text" :isRequired="false" />
    <div class="search-list__container">
      <search-item />
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { MyInput } from '@/shared/ui';
import SearchItem from '../searchItem/SearchItem.vue';
import { ref } from 'vue';

const searchValue = ref('');


</script>