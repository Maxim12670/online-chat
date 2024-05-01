import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { useMessageAPI } from "@/api/messageApiStore";

export const useMessageStore = defineStore('messageStore', () => {

  const userStore = useUserStore();
  const userId = userStore.userData.id;
  const messageAPI = useMessageAPI();

  // отправить сообщение
  async function createMessage(idDialog, messageText) {
    try {
      await messageAPI.createMessage(userId, idDialog, messageText);
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };
  // получить сообщения диалога
  async function getAllMessageDialog(idDialog) {
    try {
      const result = await messageAPI.getAllMessages(userId, idDialog);
      return result
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  return { createMessage, getAllMessageDialog }
})