<template>
  <form @submit.prevent="registerUser" class="form-login">
    <my-input v-model="formData.name" class="form-login__input" type="text" placeholder="Имя" :isRequired="true" />
    <my-input v-model="formData.surname" class="form-login__input" type="text" placeholder="Фамилия"
      :isRequired="false" />
    <my-input v-model="formData.email" class="form-login__input" type="email" placeholder="Email" :isRequired="true" />
    <my-input v-model="formData.password" class="form-login__input" type="password" placeholder="Пароль"
      :isRequired="true" />
    <div class="form-login__btn">
      <my-button type="submit" text="Регистрация" />
    </div>
  </form>
</template>

<script setup>
import './style.scss';
import { ref } from 'vue';
import { MyInput, MyButton } from '@/shared/ui/index';
import axios from 'axios';
import { useUserAPI } from '@/api/userApiStore';

const formData = ref({
  name: '',
  surname: '',
  email: '',
  password: ''
});

const userAPI = useUserAPI();

const registerUser = async (event) => {
  event.preventDefault();

  const { name, surname, email, password } = formData.value;

  await userAPI.postUser(name, surname, email, password);

}

</script>