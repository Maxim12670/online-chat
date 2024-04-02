import axios from "axios";
import { defineStore } from "pinia";

const urlPostUser = "http://localhost:5000/api/registr";
const urlByUser = "http://localhost:5000/api/user/";

const baseURL = "http://localhost:5173/";
const instance = axios.create({
  withCredentials: true,
  headers: {
    ['Content-Type']: "application/json"
  }

});

export const useUserAPI = defineStore('userAPI', () => {

  //регистрация пользователя
  const postUser = async (name, surname, email, password) => {
    try {
      await instance.post(urlPostUser, {
        name: name,
        surname: surname,
        email: email,
        password: password
      })
        .then(res => {
          console.log('Пользователь успешно зарегистрирован!');
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 400) {
              console.error('Ошибка: ', error.response.data.message);
            } else {
              console.error('Ошибка: ', error.response.statusText);
            }
          }
        })
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  }

  //получение пользователя по id
  const getUserById = async (id) => {
    try {
      axios.defaults.withCredentials = true
      const response = await instance.get(`${urlByUser}${id}`);
      return response.data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  }

  return { getUserById, postUser }
})