<template>
  <div class="dialog-item">
    <user-avatar class="dialog-item__photo" :image="image"/>
    <div class="dialog-item__initials">
      {{ surname + ' ' + name }}
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { UserAvatar } from '@/shared/ui';

defineProps({
  name: String,
  surname: String,
  image: String
});

</script>