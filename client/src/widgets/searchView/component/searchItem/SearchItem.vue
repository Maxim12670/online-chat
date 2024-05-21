<template>
  <card-item class="search-item" :name="name" :surname="surname" :image="image">
    <start-chat :id-companion="id"/>
    <button class="search-item__btn" @click="sendFriendRequest">
      <svg class="search-item__icon">
        <use xlink:href="#friends-icon"></use>
      </svg>
    </button>
  </card-item>
</template>

<script setup>
import './style.scss';
import { CardItem } from '@/entities/ui';
import { StartChat } from '@/feature/index';
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

</script>