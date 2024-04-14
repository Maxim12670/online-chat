import axios from 'axios';
import { defineStore } from 'pinia';
import { useFriendsAPI } from '@/api/friendsApiStore';
import { useUserStore } from './userStore';

export const useFriendsStore = defineStore('friendsStore', () => {

  const userStore = useUserStore();
  const friendApi = useFriendsAPI();
  const userId = userStore.userData.id;

  async function sendFriendRequest(friendId) {
    try {
      await friendApi.sendFriendRequest(userId, friendId);
    } catch (error) {
      console.log('Произошла ошибка:', error)
    }
  };

  async function respondToFriendRequest(subscriberId) {
    try {
      const result = await friendApi.respondToFriendRequest(userId, subscriberId);
      return result;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  async function removeFriend(friendId) {
    try {
      await friendApi.removeFriend(userId, friendId);
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  async function getAllFriends() {
    try {
      const result = await friendApi.getAllFriends(userId);
      return result;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  async function getAllFollowers() {
    try {
      const result = await friendApi.getAllFollowers(userId);
      return result;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  async function getAllSubscriptions() {
    try {
      const result = await friendApi.getAllSubscriptions(userId);
      return result;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  return {
    sendFriendRequest, respondToFriendRequest, removeFriend,
    getAllFriends, getAllFollowers, getAllSubscriptions
  }
});