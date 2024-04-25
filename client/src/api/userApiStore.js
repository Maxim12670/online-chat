import axios from "axios";
import { defineStore } from "pinia";

const urlRegistrUser = "http://localhost:5000/api/registr";
const urlByUser = "http://localhost:5000/api/user/";

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
      await instance.post(urlRegistrUser, {
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
  };

  //получение пользователя по id
  const getUserById = async (id) => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await instance.post(`${urlByUser}user`, {
        id: id
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  //получение всех пользователей
  const getAllUsers = async (id) => {
    try {
      const { data } = await axios.get(`${urlByUser}users`, {
        params: {
          "idUser": id
        }
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  // обновление данных пользователя
  const putUpdateUser = async (
    id, email = null, name = null, surname = null,
    password = null, age = null, city = null, image = null) => {
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('email', email);
      formData.append('name', name);
      formData.append('surname', surname);
      formData.append('password', password);
      formData.append('age', age);
      formData.append('city', city);
      formData.append('image', image);
      const { data } = await axios.post(`${urlByUser}update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  return { getUserById, postUser, putUpdateUser, getAllUsers }
})