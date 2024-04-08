import axios from "axios";
import { defineStore } from "pinia";

const baseURLPost = "http://localhost:5000/api/post";

export const usePostAPI = defineStore('postAPI', () => {

  // добавление поста
  const addPost = async (userId, content) => {
    try {
      await axios.post(`${baseURLPost}/add`, {
        userId: userId,
        content: content
      })
        .catch(error => {
          console.log('Что то пошло не так...')
        });
    } catch (error) {
      console.log('Произошла ошибка', error);
    }
  }

  const getAllPosts = async (userId) => {
    try {
      const response = await axios.post(`${baseURLPost}/posts`, {
        userId: userId
      });
      return response.data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  }

  const deletePost = async (id) => {
    try {
      await axios.post(`${baseURLPost}/delete`, {
        id: id
      });
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  }

  return { addPost, getAllPosts, deletePost }
})