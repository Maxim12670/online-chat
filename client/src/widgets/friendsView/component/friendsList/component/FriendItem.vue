<template>
  <div class="friend-item">
    <SpriteSVG />
    <img class="friend-item__photo" src="@/shared/assets/image/pict.jpg" alt="avatar">
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
import { SpriteSVG } from '@/shared/ui';
import { useFriendsStore } from '@/stores/friendsStore';
import { ref } from 'vue';

const props = defineProps({
  id: Number,
  name: String,
  surname: String,
  image: String,
  typeCase: String
});

const friendsStore = useFriendsStore();
const selectedFunction = ref('');

async function deleteFriend() {
  await friendsStore.removeFriend(props.id);
  console.log('друг успешно удален)');
};

async function addToFriend() {
  await friendsStore.respondToFriendRequest(props.id, true)
  cons.log('добавил в друзья');
};

async function deleteToSubscription() {
  await friendsStore.respondToFriendRequest(props.id, false)
  console.log('отменил подписку')
};

(async () => {
  switch (props.typeCase) {
    case 'friends':
      selectedFunction.value = deleteFriend;
      break;
    case 'follower':
      selectedFunction.value = addToFriend;
      breautk;
    case 'subscription':
      selectedFunction.value = deleteToSubscription;
      break;
  }
})();
</script>