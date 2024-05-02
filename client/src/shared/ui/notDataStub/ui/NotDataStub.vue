<template>
  <div class="not-data-stub">
    <SpriteSVG/>
    <svg class="not-data-stub__icon">
      <use xlink:href="#absence-icon"></use>
    </svg>
    <h2 class="not-data-stub__title">{{ text }}</h2>
  </div>
</template>

<script setup>
import './style.scss';
import { SpriteSVG } from '../..';

defineProps({
  text: String
})
</script>