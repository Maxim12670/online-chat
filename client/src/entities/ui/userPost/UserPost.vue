<template>
  <div class="post">
    <SpriteSVG />
    <div class="post-header">
      <div class="post-header__photo">
        <img src="../../../shared/assets/image/pict.jpg" alt="avatar">
      </div>
      <div class="post-header__wrapper">
        <div class="post-header__initials" v-if="currentUser !== undefined">
          {{ `${currentUser}` }}
          <!-- {{ `${currentUser.surname} ${currentUser.name}` }} -->
        </div>
        <div class="post-header__date">
          {{ date }}
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
import { SpriteSVG } from '@/shared/ui/index';
import { watch, ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { usePostStore } from '@/stores/postStore';

const props = defineProps({
  id: Number,
  content: String,
  date: String,
  userId: Number
});

const currentUser = ref();
const userStore = useUserStore();
const postStore = usePostStore();


watch(() => props.userId, async (newValue, oldValue) => {
  if (newValue !== oldValue && oldValue !== undefined) {
    currentUser.value = await userStore.getCurrentUser(newValue);
  }
})

</script>