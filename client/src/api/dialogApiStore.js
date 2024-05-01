import axios from "axios";
import { defineStore } from "pinia";

const baseURLDialog = 'http://localhost:5001/api/dialog';
const apiRoutesDialog = {
  createDialog: '/create',
  getAllDialogs: '/dialogs'
};

export const useDialogApi = defineStore('dialogAPI', () => {
  // создание нового диалога
  const createDialog = async (idUser, idCompanion) => {
    try {
      await axios.post(`${baseURLDialog}${apiRoutesDialog.createDialog}`, {
        idUser: idUser,
        idCompanion: idCompanion
      })
        .catch(error => {
          console.log('Что-то пошло не так...');
        });
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };
  // получить все диалоги пользователя
  const getAllDialogs = async (idUser) => {
    try {
      const {data} = await axios.get(`${baseURLDialog}${apiRoutesDialog.getAllDialogs}`, {
        params: {
          idUser: idUser
        }
      });
      return data;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  return { createDialog, getAllDialogs }
});