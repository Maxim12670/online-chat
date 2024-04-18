<template>
  <div class="post">
    <SpriteSVG />
    <div class="post-header">
      <div class="post-header__photo">
        <img src="../../../shared/assets/image/pict.jpg" alt="avatar">
      </div>
      <div class="post-header__wrapper">
        <div class="post-header__initials">
          {{ `${userData.name} ${userData.surname}` }}
        </div>
        <div class="post-header__date">
          {{ correctDateString(date) }}
        </div>
      </div>
      <div class="post-header__delete" @click="$emit('deleteCurrentPost', id)">
        <svg class="nav-menu__icon">
          <use xlink:href="#basket-icon"></use>
        </svg>
      </div>
    </div>
    <div class="post-body">
      {{ content }}
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { ref } from 'vue';
import { SpriteSVG } from '@/shared/ui/index';
import { useUserStore } from '@/stores/userStore';

const props = defineProps({
  id: Number,
  userId: Number,
  content: String,
  date: String,
});

const userStore = useUserStore();
const userData = ref('');
const dateString = ref('')

const getUserDataAsync = async (userId) => {
  userData.value = await userStore.getCurrentUser(userId);
};

const correctDateString = (str) => {
  const date = new Date(str)
  return `${date.getDate()}:${new Date(str).getMonth() + 1}:${new Date(str).getFullYear()}`;
}


(async () => {
  await getUserDataAsync(props.userId);
  correctDateString(props.date);
})();

</script>