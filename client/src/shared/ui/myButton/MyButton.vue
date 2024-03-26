<template>
    <button :type="type" class="my-button">{{ text }}</button>
</template>

<script setup>
import './style.scss';

defineProps({
  text: String,
  type: String
})

</script>