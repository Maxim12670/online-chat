<template>
  <div class="friend-item">
    <SpriteSVG />
    <user-avatar class="friend-item__photo" :image="image"/>
    <div class="friend-item__initials">
      {{ `${surname} ${name }` }}
    </div>
    <div class="friend-item__wrapper">
      <button class="friend-item__btn">
        <svg class="nav-menu__icon">
          <use xlink:href="#message-icon"></use>
        </svg>
      </button>
      <button class="friend-item__btn" @click="selectedFunction">
        <svg class="nav-menu__icon">
          <use :xlink:href="typeCase === 'follower' ? '#friends-icon' : '#basket-icon'"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { SpriteSVG, UserAvatar } from '@/shared/ui';
import { useFriendsStore } from '@/stores/friendsStore';
import { inject, ref } from 'vue';

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