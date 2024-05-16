<template>
  <form @submit.prevent="authorizeUser" class="form-login">
    <my-input v-model="formData.email" class="form-login__input" type="email" placeholder="Email" :isRequired="true" />
    <my-input v-model="formData.password" class="form-login__input" type="password" placeholder="Пароль"
      :isRequired="true" />
    <div class="form-login__btn">
      <my-button type="submit" text="Войти" />
    </div>
  </form>
</template>

<script setup>
import './style.scss';
import { ref } from 'vue';
import { MyInput, MyButton } from '@/shared/ui/index';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const formData = ref({
  email: '',
  password: ''
});

const userStore = useUserStore();
const router = useRouter();

const authorizeUser = async (event) => {
  const { email, password } = formData.value;
  try {
    const data = await userStore.authorization(email, password)
    await userStore.getUserData();
    userStore.checkAuth();
  } catch (error) {
    console.log('Произошла ошибка:', error)
  }
}

</script>