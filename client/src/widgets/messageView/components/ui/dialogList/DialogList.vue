<template>
  <div class="dialog-list">
    <my-input class="dialog-list__input" placeholder="Поиск" type="text" :isRequired="false" v-model="searchFilter" />
    <div class="dialog-list__container">
      <dialog-item class="dialog-list__item" v-for="dialog in dialogs" :key="dialog.dialog_id"
        :name="dialog.name_companion" :surname="dialog.surname_companion" :image="dialog.image_companion"
        @click="openChatRoom(dialog.dialog_id, dialog.name_companion, dialog.surname_companion)" />
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { MyInput } from '@/shared/ui/index';
import DialogItem from './components/dialogItem/DialogItem.vue';
import { computed, onMounted, ref } from 'vue';
import { useDialogStore } from '@/stores/dialogStore';
import { useRouter } from 'vue-router';

const dialogStore = useDialogStore();
const router = useRouter();
const dialogs = ref([]);

const searchFilter = ref('');
const filterChat = computed(() => {
  // добавить логику фильтрации
  return searchFilter.value;
});

const openChatRoom = (idChat, userName, userSurname) => {
  router.push({
    name: 'chat', params: { id: idChat },
    query: {
      name: userName,
      surname: userSurname
    }
  });
}

onMounted(async () => {
  dialogs.value = await dialogStore.getAllDialogs();
});


</script>