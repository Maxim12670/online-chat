import { defineStore } from "pinia";
import { ref } from 'vue';
import { useUserAPI } from "@/api/userApiStore";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const useUserStore = defineStore('userStore', () => {

  const userAPI = useUserAPI();
  const router = useRouter();

  const userData = ref({
    id: '',
    email: '',
    name: '',
    surname: '',
    image: '',
    age: '',
    city: ''
  });

  const userToken = ref({
    accessToken: '',
    refreshToken: ''
  })

  function setUserData(data) {
    userData.value = {
      id: data.id,
      email: data.email,
      name: data.name,
      surname: data.surname,
      image: data.image,
      age: data.age,
      city: data.city
    }
  }

  function setUserToken(data) {
    userToken.value = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    }
  }

  async function authorization(email, password) {
    try {
      const data = await userAPI.authorization(email, password);
      setUserData(data);
      setUserToken(data);

      return { id: userData.value.id };

    } catch (error) {
      console.log('Произошла ошибка при авторизации:', error);
    }
  }

  async function logout() {
    try {
      await userAPI.logout(userData.value.id);
      userData.value = '';
      isLogin.value = false;
      router.push({ path: '/auth' });
    } catch (error) {
      console.log('Произошла ошибка при выходе из аккаунта:', error);
    }
  }

  async function getUserData(id) {
    try {
      const data = await userAPI.getUserById(id);
      setUserData(data);

      userToken.value = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      }
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
      const { accessToken, refreshToken } = userData.value;
      console.log(userData.value.accessToken)
      await userAPI.putUpdateUser(
        id, email, name, surname, password, age, city, image, accessToken, refreshToken)
      getUserData(id, userData.value.accessToken);

    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };


  async function checkAuth() {
    try {
      const cookieToken = Cookies.get('userData');
      if (!cookieToken) {
        router.push({ name: 'FormsPage' });
      } else {
        const decodeToken = jwtDecode(cookieToken);
        setUserData(decodeToken);
        router.push({ name: 'MainPage' });
      }
    } catch (error) {
      console.log('Ошибка при проверке авторизации:', error);
    }
  }

  return {
    userData, userToken, authorization,
    logout, getUserData, getCurrentUser,
    getUsers, updateUser,
    checkAuth
  }
});