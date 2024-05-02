<template>
  <div class="search-item">
    <SpriteSVG />
    <div class="search-item__photo">
      <user-avatar :image="image" />
    </div>
    <div class="search-item__initials">
      {{ `${surname} ${name}` }}
    </div>
    <div class="search-item__btns">
      <button class="search-item__btn" @click="() => createDialog(id)">
        <svg class="search-item__icon">
          <use xlink:href="#message-icon"></use>
        </svg>
      </button>
      <button class="search-item__btn" @click="sendFriendRequest">
        <svg class="search-item__icon">
          <use xlink:href="#friends-icon"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { SpriteSVG, UserAvatar } from '@/shared/ui/index';
import { useFriendsStore } from '@/stores/friendsStore';
import { useDialogStore } from '@/stores/dialogStore';

const props = defineProps({
  id: Number,
  name: String,
  surname: String,
  image: String
})

const friendsStore = useFriendsStore();
const dialogStore = useDialogStore();

async function sendFriendRequest() {
  try {
    await friendsStore.sendFriendRequest(props.id);
  } catch (error) {
    console.log('Произошла ошибка:', error);
  }
}

async function createDialog(idCompanion) {
  try {
    await dialogStore.createDialog(idCompanion);
    console.log('создал диалог');
  } catch (error) {
    console.log('Что-то пошло не так...', error);
  }
}
</script>