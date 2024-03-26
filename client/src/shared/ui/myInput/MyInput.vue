<template>
  <input :value="modelValue" @input="onModelValueUpdate" :type="type" :placeholder="placeholder" :required="isRequired"
    class="my-input">
</template>

<script setup>
import './style.scss';
import { defineEmits } from 'vue';
const emits = defineEmits(['update:modelValue'])
const onModelValueUpdate = (value) => {
  emits('update:modelValue', value.target.value)
}
defineProps({
  type: String,
  placeholder: String,
  isRequired: Boolean,
  modelValue: String
})

</script>