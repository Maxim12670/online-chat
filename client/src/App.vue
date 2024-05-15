<template>
  <div>
    <SpriteSVG />
    <router-view></router-view>
  </div>

</template>

<script setup>
import { onMounted } from 'vue';
import { SpriteSVG } from './shared/ui';
import { useUserStore } from './stores/userStore';

const userData = useUserStore();

onMounted(() => {
  userData.checkAuth();
})
</script>
