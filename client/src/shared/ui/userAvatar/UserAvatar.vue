<template>
  <img v-if="image === null" src="@/shared/assets/image/pict.jpg" class="avatar" alt="avatar">
  <img v-else :src="`http://localhost:5000/${image}`" class="avatar" alt="avatar">
</template>

<script setup>
import './style.scss';

defineProps({
  image: String
});

</script>