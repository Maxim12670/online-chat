<template>
  <div class="chat-room">
    <div class="chat-room__header">

      <button class="chat-room__exit-btn" @click="$router.go(-1)">
        <svg class="chat-room__exit-icon">
          <use xlink:href="#go-out-icon"></use>
        </svg>
      </button>

      <div class="chat-room__initials">
        {{ router.query.surname + ' ' + router.query.name }}
      </div>
      <user-avatar class="chat-room__photo" :image="null" />
    </div>

    <loader-content v-if="!loadedMessages" class="message-loader" />
    <ul v-else class="message-list">
      <div v-if="!messages.length" class="message-list_empty">Напиши первое сообщение!</div>
      <li v-else v-for="item in messages" :key="item" class="message-list__item"
        :class="[item.status === 'user-message' ? 'message-list__item_rigth' : 'message-list__item_left']">
        {{ item.message_text }}
      </li>
    </ul>

    <div class="message-panel">
      <textarea class="message-panel__input" placeholder="Новое сообщение..." wrap v-model="messageString"
        maxlength="200" @input="(event) => {
        autoResizeTextarea(event);
        inputMessageText(event.target.value)
      }"></textarea>

      <button class="message-panel__btn" @click="() => sendMessage(messageString)">
        <svg class="message-panel__icon">
          <use xlink:href="#send-message-icon"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { UserAvatar, LoaderContent } from '@/shared/ui';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMessageStore } from '@/stores/messageStore';
import { useSocketStore } from '@/stores/socketStore';

const socketStore = useSocketStore();
const router = useRoute();
const messageStore = useMessageStore();
const messageString = ref('');
const messages = ref([]);
const idDialog = ref('');
const loadedMessages = ref(false);


function inputMessageText(str) {
  messageString.value = str;
}

async function getMessages() {
  try {
    messages.value = await messageStore.getAllMessageDialog(idDialog.value);
  } catch (error) {
    console.log('Что-то пошло не так...', error);
  }
}

function autoResizeTextarea(event) {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight - 14 + 'px';
}

async function sendMessage(messageText) {
  try {
    socketStore.sendMessage(idDialog.value, messageText);
    let message = {
      message_text: messageText,
      status: 'user-message'
    }
    messages.value.push(message)

    console.log('messageText', messageText);
    messageString.value = '';

  } catch (error) {
    console.log('Что-то пошло не так...'.error);
  }
}

socketStore.reciveMessage().then((data) => {
  console.log('it is work:', data);
  messages.value.push(data);
}).catch((error) => {
  console.log('Error in socket:', error);
})

onMounted(() => {
  messages.value = router.params.messages;
  idDialog.value = router.params.id;
  loadedMessages.value = true;
  socketStore.joinRoom(idDialog.value)
});

</script>
