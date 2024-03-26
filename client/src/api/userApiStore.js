import axios from "axios";
import { defineStore } from "pinia";

const urlPostUser = "http://localhost:5000/api/registr";
const urlByUser = "http://localhost:5000/api/user/";

export const useUserAPI = defineStore('userAPI', () => {

  //регистрация пользователя
  const postUser = async (name, surname, email, password) => {
    try {
      await axios.post(urlPostUser, {
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
      const response = await axios.get(`${urlByUser}${id}`);
      return response.data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  }

  return { getUserById, postUser }
})