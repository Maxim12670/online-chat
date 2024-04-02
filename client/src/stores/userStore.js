import axios from "axios";
import { defineStore } from "pinia";
import { ref, watch } from 'vue';
import { useUserAPI } from "@/api/userApiStore";
import { getCookies } from "@/shared/helper/cookies/Cookies";

const urlByUser = 'http://localhost:5000/api/user/';

export const useUserStore = defineStore('userStore', () => {

  const isLogin = ref(false);

  const userData = ref({
    id: '',
    name: '',
    surname: '',
    email: '',
    image: ''
  });

  const userAPI = useUserAPI();

  const updateIsLogin = (value) => {
    isLogin.value = value;
  }

  const getUserData = async (id) => {
    try {
      const data = await userAPI.getUserById(id);
      userData.value = {
        id: data.id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        image: data.image
      };
      isLogin.value = !isLogin.value;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  if (localStorage.getItem('userData')) {
    const cookieValue = JSON.parse(getCookies('userData'));
    const { id, name, surname, email, image } = cookieValue;
    userData.value = {
      id: id,
      name: name,
      surname: surname,
      email: email,
      image: image
    }
  }

  watch(userData, () => {
    if (isLogin) {
      localStorage.setItem('userData', JSON.stringify(userData))
    }
  }, { deep: true })

  return { userData, isLogin, getUserData, updateIsLogin }
});