<template>
  <button class="start-chat" @click="createDialog">
    <svg class="start-chat__icon">
      <use xlink:href="#message-icon"></use>
    </svg>
  </button>
</template>

<script setup>
import './style.scss';
import { useDialogStore } from '@/stores/dialogStore';
import { useRouter } from 'vue-router';

const props = defineProps({
  idCompanion: Number
})

const dialogStore = useDialogStore();
const router = useRouter();

async function createDialog() {
  try {
    const data = await dialogStore.createDialog(props.idCompanion);
    if (data !== null || undefined) {
      openChatRoom(data.roomid, data.name, data.surname)
    }
  } catch (error) {
    console.log('Что-то пошло не так...', error);
  }
}

const openChatRoom = (idChat, userName, userSurname) => {
  router.push({
    name: 'chat', params: { id: idChat },
    query: {
      name: userName,
      surname: userSurname
    }
  });
};

</script>