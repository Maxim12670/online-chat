<template>
  <Transition name="modal">
    <div v-if="show" class="modal-window__mask">
      <div class="modal-window__container">
        <form @submit.prevent="updateUserInfo" enctype="multipart/form-data">
          <div class="modal-window__wrapper">
            <h2 class="modal-window__title">Введите свои данные</h2>
            <SpriteSVG />
            <svg class="modal-window__close" @click="show = !show">
              <use xlink:href="#close-icon"></use>
            </svg>
          </div>
          <my-input class="modal-window__input" v-model="formData.name" type="text" placeholder="Имя:"
            :isRequired="false" />
          <my-input class="modal-window__input" v-model="formData.surname" type="text" placeholder="Фамилия:"
            :isRequired="false" />
          <my-input class="modal-window__input" v-model="formData.age" type="text" placeholder="Возраст:"
            :isRequired="false" />
          <my-input class="modal-window__input" v-model="formData.city" type="text" placeholder="Город:"
            :isRequired="false" />
          <my-input class="modal-window__input modal-window__input_file" @change="onFileChange" type="file"
            placeholder="Загрузить фото" />
          <my-button class="modal-window__btn" type="submit" text="Сохранить данные" @click="show = !show">
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
import { MyInput, MyButton, SpriteSVG } from '../../index';
import { useUserStore } from '@/stores/userStore';

const props = defineProps({
  show: Boolean
});

const userStore = useUserStore();

const formData = ref({
  name: userStore.userData.name || '',
  surname: userStore.userData.surname || '',
  age: userStore.userData.age || '',
  city: userStore.userData.city || '',
  image: ''
});

const onFileChange = (event) => {
  formData.value.image = event.target.files[0];
}

const updateUserInfo = async (event) => {
  try {
    const { name, surname, age, city, image } = formData.value;
    // в будущем будет функционал по обновлению всех данных!!!
    const { id, email, password } = userStore.userData;
    await userStore.updateUser(
      id, email, name, surname, password, age, city, image);
  } catch (error) {
    console.log('Произошла ошибка:', error);
  }
}

</script>