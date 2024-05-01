<template>
  <div class="dialog-list">
    <my-input class="dialog-list__input" placeholder="Поиск" type="text" :isRequired="false" v-model="searchFilter" />
    <div class="dialog-list__container">
      <dialog-item class="dialog-list__item" 
      v-for="dialog in dialogs" :key="dialog.dialog_id"
      :name="dialog.name_companion" :surname="dialog.surname_companion" :image="dialog.image_companion"/>
    </div>
    <!-- <chat-room/> -->
  </div>
</template>

<!-- !!!!! импорт комнаты для реализации верстки
нужно убрать !!!!!! -->
<script setup>
import './style.scss';
import { MyInput } from '@/shared/ui/index';
import DialogItem from './components/dialogItem/DialogItem.vue';
import { computed, onMounted, ref } from 'vue';
import {useDialogStore} from '@/stores/dialogStore';

import ChatRoom from '@/widgets/chatRoom/ui/ChatRoom.vue'

const dialogStore = useDialogStore();
const dialogs = ref([]);

const searchFilter = ref('');
const filterChat = computed(() => {
  // добавить логику фильтрации
  return searchFilter.value;
})

onMounted(async() => {
  dialogs.value = await dialogStore.getAllDialogs();
});


</script>