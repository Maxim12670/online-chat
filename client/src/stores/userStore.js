import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from 'vue';
import { useUserAPI } from "@/api/userApiStore";
import { getCookies } from "@/shared/helper/cookies/Cookies";
import { useRouter } from "vue-router";

const urlByUser = 'http://localhost:5000/api/user/';

export const useUserStore = defineStore('userStore', () => {

  const isLogin = ref(false);
  const userAPI = useUserAPI();
  const router = useRouter();

  const userData = ref({
    id: '',
    email: '',
    name: '',
    surname: '',
    image: '',
    age: '',
    city: '',
  });

  function updateIsLogin(newValue) {
    isLogin.value = newValue;
    localStorage.setItem('isLogin', isLogin.value)
  }

  async function getUserData(id) {
    try {
      const data = await userAPI.getUserById(id);
      userData.value = {
        id: data.id,
        email: data.email,
        name: data.name,
        surname: data.surname,
        image: data.image,
        age: data.age,
        city: data.city
      };
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  async function getCurrentUser(id) {
    try {
      const res = await userAPI.getUserById(id, false);
      return res;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  async function getUsers(id) {
    try {
      const res = await userAPI.getAllUsers(id);
      return res;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  async function updateUser(
    id, email = null, name = null, surname = null,
    password = null,
    age = null, city = null, image = null) {
    try {
      await userAPI.putUpdateUser(
        id, email, name, surname, password, age, city, image)
        .then(res => {
          getUserData(id);
        });;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  function exitAccount() {
    userData.value = '';
    isLogin.value = false;
    localStorage.removeItem('isLogin');
    router.push({path: '/auth'});
  };

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

  return {
    userData, isLogin, getUserData,
    getCurrentUser, getUsers, updateIsLogin,
    updateUser, exitAccount
  }
});