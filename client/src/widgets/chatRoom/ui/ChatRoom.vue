<template>
  <div class="chat-room">
    <SpriteSVG />
    <div class="chat-room__header">

      <button class="chat-room__exit-btn">
        <svg class="chat-room__exit-icon">
          <use xlink:href="#go-out-icon"></use>
        </svg>
      </button>

      <div class="chat-room__initials">
        Name Surname
      </div>
      <user-avatar class="chat-room__photo" :image="null"/>
    </div>

    <ul class="message-list">
      <li class="message-list__item message-list__item_left">
        Friends message
      </li>
      <li class="message-list__item message-list__item_rigth">
        My message
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
import { ref } from 'vue';

const messageString = ref('')

function autoResizeTextarea(event) {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight - 14 + 'px';
}

</script>