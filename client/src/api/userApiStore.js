import axios from "axios";
import { defineStore } from "pinia";

import axiosToken from '@/shared/helper/axios/axiosConfig';


const baseURLUser = "http://localhost:5000/api/user";
const apiRoutesUser = {
  registration: '/registr',
  authorization: '/auth',
  logout: '/logout',
  getUser: '/user',
  getCurrentUser: '/user/current',
  getAllUsers: '/users',
  updateUserData: '/update'
}

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
      await instance.post(`${baseURLUser}${apiRoutesUser.registration}`, {
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

  // авторизация пользователя
  const authorization = async (email, password) => {
    try {
      const { data } = await instance.post(`${baseURLUser}${apiRoutesUser.authorization}`, {
        email: email,
        password: password
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка при авторизации:', error);
    }
  };

  // получить данные авторизованного пользователя
  const getUser = async () => {
    try {
      const data = await axiosToken.get(`${baseURLUser}${apiRoutesUser.getUser}`, {
        withCredentials: true
      })

      return data
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  }

  // выход из аккаунта
  const logout = async (id) => {
    try {
      await axiosToken.post(`http://localhost:5000/api/user/logout`, { id: id });
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  //получение пользователя по id
  const getUserById = async (id) => {
    try {
      const { data } = await axios.get(
        `${baseURLUser}${apiRoutesUser.getCurrentUser}`, {
        params: {
          id: id
        }
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  //получение всех пользователей
  const getAllUsers = async (id) => {
    try {
      const { data } = await axios.get(`${baseURLUser}${apiRoutesUser.getAllUsers}`, {
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
      const { data } = await axios.post(`${baseURLUser}${apiRoutesUser.updateUserData}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  return {
    authorization,
    getUser,
    logout,
    getUserById,
    postUser,
    putUpdateUser,
    getAllUsers
  }
})