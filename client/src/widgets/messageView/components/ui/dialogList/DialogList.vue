<template>
  <div class="dialog-list">
    <my-input class="dialog-list__input" placeholder="Поиск" type="text" :isRequired="false" v-model="searchFilter"/>
    <div class="dialog-list__container">
      <dialog-item class="dialog-list__item" />
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { MyInput } from '@/shared/ui/index';
import DialogItem from './components/dialogItem/DialogItem.vue';
import { computed, ref } from 'vue';

const searchFilter = ref('');
const filterChat = computed(()=>{
  // добавить логику фильтрации
  return searchFilter.value;
})

// добавить при onMounted загрузку всех чатов
// которые уже были созданы ранее

</script>