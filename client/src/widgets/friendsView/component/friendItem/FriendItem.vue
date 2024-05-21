<template>
  <card-item class="friend-item" :name="name" :surname="surname" :image="image">
    <button class="friend-item__btn">
      <svg class="friend-item__icon friend-item__icon_white">
        <use xlink:href="#message-icon"></use>
      </svg>
    </button>
    <button class="friend-item__btn" @click="selectedFunction">
      <svg class="friend-item__icon"
        :class="typeCase !== 'follower' ? 'friend-item__icon_red' : 'friend-item__icon_white'">
        <use :xlink:href="typeCase === 'follower' ? '#friends-icon' : '#basket-icon'"></use>
      </svg>
    </button>
  </card-item>
</template>

<script setup>
import './style.scss';
import { useFriendsStore } from '@/stores/friendsStore';
import { inject, ref } from 'vue';
import { CardItem } from '@/entities/ui/index';

const props = defineProps({
  id: Number,
  name: String,
  surname: String,
  image: String,
  typeCase: String
});

const deletePersonFromArray = inject('deletePersonFromArray');

const friendsStore = useFriendsStore();
const selectedFunction = ref('');

async function deleteFriend() {
  await friendsStore.removeFriend(props.id);
  deletePersonFromArray(props.id);
  console.log('друг успешно удален)');
};

async function addToFriend() {
  await friendsStore.respondToFriendRequest(props.id, true)
  deletePersonFromArray(props.id);
  console.log('добавил в друзья');
};

async function deleteToSubscription() {
  await friendsStore.respondToFriendRequest(props.id, false)
  deletePersonFromArray(props.id);
  console.log('отменил подписку')
};

(async () => {
  switch (props.typeCase) {
    case 'friends':
      selectedFunction.value = deleteFriend;
      break;
    case 'follower':
      selectedFunction.value = addToFriend;
      break;
    case 'subscription':
      selectedFunction.value = deleteToSubscription;
      break;
  }
})();
</script>