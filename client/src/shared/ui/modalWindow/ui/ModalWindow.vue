<template>
  <Transition name="modal">
    <div v-if="show" class="modal-window__mask">
      <div class="modal-window__container">
        <form @submit.prevent="updateUserInfo">
          <h2 class="modal-window__title">
            Введите свои данные
          </h2>
          <my-input class="modal-window__input" v-model="formData.name" type="text" placeholder="Имя:"
            :isRequired="false" />
          <my-input class="modal-window__input" v-model="formData.surname" type="text" placeholder="Фамилия:"
            :isRequired="false" />
          <my-input class="modal-window__input" v-model="formData.age" type="text" placeholder="Возраст:"
            :isRequired="false" />
          <my-input class="modal-window__input" v-model="formData.city" type="text" placeholder="Город:"
            :isRequired="false" />
          <my-input class="modal-window__input modal-window__input_file" v-model="formData.image" type="file"
            placeholder="Загрузить фото" :isRequired="false" />
          <my-button class="modal-window__btn" type="submit" text="Сохранить данные"
            @click="show = !show, updateUserInfo">
            Сохранить данные
          </my-button>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import './style.scss';
import { ref } from 'vue';
import { MyInput, MyButton } from '../../index';
import { useUserStore } from '@/stores/userStore';

const props = defineProps({
  show: Boolean
});

const userStore = useUserStore();

const formData = ref({
  name: null,
  surname: null,
  age: null,
  city: null,
  image: null
});

const updateUserInfo = async (event) => {
  try {
    event.preventDefault()
    const { name, surname, age, city, image } = formData.value;
    const { id } = userStore.userData;
    await userStore.updateUser(id, name, surname, age, city, image);

  } catch (error) {
    console.log('Произошла ошибка:', error);
  }
}

</script>