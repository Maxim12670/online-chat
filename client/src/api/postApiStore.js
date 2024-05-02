import axios from "axios";
import { defineStore } from "pinia";

const baseURLPost = "http://localhost:5000/api/post";
const apiRoutesPost = {
  createPost: '/add',
  getAllPosts: '/posts',
  deletePost: '/delete'
}

export const usePostAPI = defineStore('postAPI', () => {

  // добавление поста
  const addPost = async (userId, content) => {
    try {
      await axios.post(`${baseURLPost}${apiRoutesPost.createPost}`, {
        userId: userId,
        content: content
      })
        .catch(error => {
          console.log('Что то пошло не так...')
        });
    } catch (error) {
      console.log('Произошла ошибка', error);
    }
  };

  // получить все посты
  const getAllPosts = async (userId) => {
    try {
      const { data } = await axios.post(`${baseURLPost}${apiRoutesPost.getAllPosts}`, {
        userId: userId
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  // удалить выбранный пост
  const deletePost = async (id) => {
    try {
      await axios.post(`${baseURLPost}${apiRoutesPost.deletePost}`, {
        id: id
      });
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  return { addPost, getAllPosts, deletePost }
})