<template>
  <div class="chat-room">
    <SpriteSVG />
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

    <!-- <ul class="message-list">
      <li class="message-list__item message-list__item_left">
        Friends message
      </li>
      <li class="message-list__item message-list__item_rigth">
        My message
      </li>
    </ul> -->

    <ul class="message-list">
      <div v-if="!messages.length" class="message-list_empty">Напиши первое сообщение!</div>
      <li v-else v-for="item in messages" :key="item.id" class="message-list__item" 
        :class="[ item.status === 'user-message'? 'message-list__item_rigth' : 'message-list__item_left' ]">
        {{ item.message_text }}
      </li>
    </ul>

    <div class="message-panel">
      <textarea class="message-panel__input" placeholder="Новое сообщение..." wrap v-model="messageString"
        maxlength="200" @input="(event) => autoResizeTextarea(event)"></textarea>

      <button class="message-panel__btn">
        <svg class="message-panel__icon">
          <use xlink:href="#send-message-icon"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { SpriteSVG, UserAvatar } from '@/shared/ui';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute();
const messageString = ref('')
const messages = ref([]);

function autoResizeTextarea(event) {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight - 14 + 'px';
}

onMounted(() => {
  messages.value = router.params.messages;
  console.log(messages.value)
})

</script>




<!-- <ul class="message-list">
  <li class="message-list__item message-list__item_left">
    Friends message
  </li>
  <li class="message-list__item message-list__item_rigth">
    My message
  </li>
</ul> -->