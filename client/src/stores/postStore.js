import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";
import { usePostAPI } from "@/api/postApiStore";
import { useUserStore } from "@/stores/userStore"

export const usePostStore = defineStore('postStore', () => {

  const postAPI = usePostAPI();
  const userStore = useUserStore();
  const postsArray = ref([{
    id: '',
    content: '',
    date: '',
    userId: ''
  }]);

  async function addUserPost(content) {
    const userId = userStore.userData.id;
    try {
      if (content.lenght != 0) {
        await postAPI.addPost(userId, content);
      }
      else {
        console.log('Нельзя добавить пустой пост!');
      }
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  }

  async function getUserPosts() {
    try {
      const userId = userStore.userData.id;
      const res = await postAPI.getAllPosts(userId);
      return res;

    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  }

  async function deleteUserPost(id) {
    try {
      await postAPI.deletePost(id);
    }catch (error) {
      console.log('Произошла ошибка:', error);
    }
  }

  return { postsArray, addUserPost, getUserPosts, deleteUserPost }
})
