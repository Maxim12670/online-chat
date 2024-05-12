<template>
  <div class="post">
    <div class="post-header">
      <div class="post-header__photo">
        <user-avatar :image="image"/>
      </div>
      <div class="post-header__wrapper">
        <div class="post-header__initials">
          {{ `${name} ${surname}` }}
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
import { UserAvatar } from '@/shared/ui/index';
import { useUserStore } from '@/stores/userStore';

const props = defineProps({
  id: Number,
  name: String,
  surname: String,
  image: String,
  content: String,
  date: String,
});

const correctDateString = (str) => {
  const date = new Date(str)
  return `${date.getDate()}:${new Date(str).getMonth() + 1}:${new Date(str).getFullYear()}`;
}

(async () => {
  correctDateString(props.date);
})();

</script>