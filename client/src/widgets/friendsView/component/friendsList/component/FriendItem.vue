<template>
  <div class="friend-item">
    <SpriteSVG />
    <img class="friend-item__photo" src="@/shared/assets/image/pict.jpg" alt="avatar">
    <div class="friend-item__initials">
      {{ `${userData.surname} ${userData.name}` }}
    </div>
    <div class="friend-item__wrapper">
      <button class="friend-item__btn">
        <svg class="nav-menu__icon">
          <use xlink:href="#message-icon"></use>
        </svg>
      </button>
      <button class="friend-item__btn" @click="selectedFunction">
        <svg class="nav-menu__icon">
          <use xlink:href="#basket-icon"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { SpriteSVG } from '@/shared/ui';
import { useUserStore } from '@/stores/userStore';
import { useFriendsStore } from '@/stores/friendsStore';
import { ref } from 'vue';

const props = defineProps({
  id: Number,
  typeCase: String
});

const userStore = useUserStore();
const friendsStore = useFriendsStore();
const userData = ref('');
const selectedFunction = ref('');

async function getUserData() {
  if (props.id) {
    userData.value = await userStore.getCurrentUser(props.id);
  }
};

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
      await getUserData();
      selectedFunction.value = deleteFriend;
      break;
    case 'follower':
      await getUserData();
      selectedFunction.value = addToFriend;
      breautk;
    case 'subscription':
      await getUserData();
      selectedFunction.value = deleteToSubscription;
      break;
  }
})();
</script>