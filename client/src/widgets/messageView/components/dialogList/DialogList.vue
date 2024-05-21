<template>
  <div class="dialog-list">
    <my-input class="dialog-list__input" v-model="filterString" placeholder="Поиск" type="text" :isRequired="false"  />
    <loader-content v-if="!loadedDialogs" class="dialog-list__loader"/>
    <div v-else class="dialog-list__container">
      <not-data-stub v-if="!filterDialog.length" text="Диалогов нет!"/>
      <card-item v-else class="dialog-list__item" v-for="(dialog, index) in filterDialog" :key="index"
        :name="dialog.name_companion" :surname="dialog.surname_companion" :image="dialog.image_companion"
        @click="openChatRoom(dialog.dialog_id, dialog.name_companion, dialog.surname_companion)" />
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { MyInput, NotDataStub, LoaderContent } from '@/shared/ui/index';
import { CardItem } from '@/entities/ui';
import { computed, onMounted, ref } from 'vue';
import { useDialogStore } from '@/stores/dialogStore';
import { searchByStringInPerson } from '@/shared/lib/hooks/searchString';
import { useRouter } from 'vue-router';

const dialogStore = useDialogStore();
const router = useRouter();
const dialogs = ref([]);
const loadedDialogs = ref(false);

const filterString = ref('');
const filterDialog = computed(() => {
  return searchByStringInPerson(filterString.value, dialogs.value);
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
  loadedDialogs.value = true;
});


</script>