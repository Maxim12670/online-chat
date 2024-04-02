<template>
  <Transition name="modal">
    <div v-if="showModalWindow" class="modal-window__mask">
      <div class="modal-window__container">
        <h2>HTTP cookie</h2>
        <button @click="$emit('closeModalWindow')">
          закрыть
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import './style.scss';

const props = defineProps({
  showModalWindow: Boolean
})

</script>