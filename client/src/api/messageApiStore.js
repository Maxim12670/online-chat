import axios from "axios";
import { defineStore } from "pinia";

const baseURLMessage = 'http://localhost:5001/api/message';
const apiRoutesMessage = {
  postMessage: '/new',
  getAllMessages: '/messages'
};

export const useMessageAPI = defineStore('messageAPI', () => {

  // отправить сообщение
  const createMessage = async (idUser, idDialog, messageText) => {
    try {
      await axios.post(`${baseURLMessage}${apiRoutesMessage.createMessage}`, {
        idUser: idUser,
        idDialog: idDialog,
        messageText: messageText
      });
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };
  // получить сообщения диалога
  const getAllMessages = async (idUser, idDialog) => {
    try {
      const {data} = await axios.get(`${baseURLMessage}${apiRoutesMessage.getAllMessages}`, {
        params: {
          idUser: idUser,
          idDialog: idDialog
        }
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  return { createMessage, getAllMessages }
})
