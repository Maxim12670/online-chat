import axios from "axios";
import { defineStore } from "pinia";
import { ref, watch, isRef } from 'vue';
import { useUserAPI } from "@/api/userApiStore";
import { getCookies } from "@/shared/helper/cookies/Cookies";

const urlByUser = 'http://localhost:5000/api/user/';

export const useUserStore = defineStore('userStore', () => {

  const isLogin = ref(false);
  const userAPI = useUserAPI();

  const userData = ref({
    id: '',
    name: '',
    surname: '',
    email: '',
    age: '',
    city: '',
    image: ''
  });

  function updateIsLogin(val) {
    isLogin.value = val;
    localStorage.setItem('isLogin', isLogin.value)
  }

  async function getUserData(id) {
    try {
      const data = await userAPI.getUserById(id);
      userData.value = {
        id: data.id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        age: data.age,
        city: data.city,
        image: data.image
      };
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  async function updateUser(id, name = null, surname = null,
    age = null, city = null, image = null) {
    try {
      await userAPI.putUpdateUser(id, name, surname, age, city, image)
        .then(res => {
          getUserData(id);
        });;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  }

  if (localStorage.getItem('isLogin')) {
    const cookieValue = JSON.parse(getCookies('userData'));
    const { id, name, surname, email, age, city, image } = cookieValue;
    userData.value = {
      id: id,
      name: name,
      surname: surname,
      email: email,
      age: age,
      city: city,
      image: image
    }
  }

  return { userData, isLogin, getUserData, updateIsLogin, updateUser }
});