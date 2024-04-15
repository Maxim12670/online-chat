import { defineStore, setMapStoreSuffix } from "pinia";
import axios from 'axios';

const baseURLFriends = "http://localhost:5001/api/friend";
const ApiRoutes = {
  friendRequest: "/request",
  answerRequest: "/answer",
  removeFriend: "/remove",
  getFriends: "/friends",
  getFollowers: "/followers",
  getSubscriptions: "/subscriptions"
};

export const useFriendsAPI = defineStore('friendsAPI', () => {

  // отправить запрос на дружбу
  const sendFriendRequest = async (userId, friendId) => {
    try {
      await axios.post(`${baseURLFriends}${ApiRoutes.friendRequest}`, {
        id_sender: userId,
        id_recipient: friendId
      })
        .catch(error => {
          console.log('Что-то пошло не так...');
        })
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  // дать ответ на запрос
  const respondToFriendRequest = async (userId, subscriberId, status) => {
    try {
      if (status === true) {
        const { data } = await axios.put(`${baseURLFriends}${ApiRoutes.answerRequest}`, {
          id_sender: subscriberId,
          id_recipient: userId,
          status: status
        });
        return data;
      } else if (status === false) {
        const { data } = await axios.put(`${baseURLFriends}${ApiRoutes.answerRequest}`, {
          id_sender: userId,
          id_recipient: subscriberId,
          status: status
        });
        return data;
      }

    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  // удалить из друзей
  const removeFriend = async (userId, friendId) => {
    try {
      await axios.post(`${baseURLFriends}${ApiRoutes.removeFriend}`, {
        firstUser: userId,
        secondUser: friendId
      });
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  // получить всех друзей
  const getAllFriends = async (userId) => {
    try {
      const { data } = await axios.post(`${baseURLFriends}${ApiRoutes.getFriends}`, {
        idUser: userId
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  // получить всех подписчиков
  const getAllFollowers = async (userId) => {
    try {
      const { data } = await axios.post(`${baseURLFriends}${ApiRoutes.getFollowers}`, {
        idUser: userId
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  // получить все подписки
  const getAllSubscriptions = async (userId) => {
    try {
      const { data } = await axios.post(`${baseURLFriends}${ApiRoutes.getSubscriptions}`, {
        idUser: userId
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  return {
    sendFriendRequest, respondToFriendRequest, removeFriend,
    getAllFriends, getAllFollowers, getAllSubscriptions
  }
})
