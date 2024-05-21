<template>
  <div class="card-item">
    <user-avatar class="card-item__photo" :image="image" />
    <div class="card-item__initials">
      {{ `${surname} ${name}` }}
    </div>
    <div class="card-item__wrapper">
      <slot>

      </slot>
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
