import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { useDialogApi } from "@/api/dialogApiStore";

export const useDialogStore = defineStore('dialogStore', () => {

  const userStore = useUserStore();
  const dialogAPI = useDialogApi();
  const userId = userStore.userData.id;

  // создать диалог
  async function createDialog(idCompanion) {
    try {
      await dialogAPI.createDialog(userId, idCompanion);
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };
  // получить все диалоги пользователя
  async function getAllDialogs() {
    try {
      const result = await dialogAPI.getAllDialogs(userId);
      return result;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  return { createDialog, getAllDialogs }
});