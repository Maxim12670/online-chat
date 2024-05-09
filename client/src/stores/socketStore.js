import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { io } from "socket.io-client";

export const useSocketStore = defineStore('socketStore', () => {

  const userStore = useUserStore();
  const idUser = userStore.userData.id;
  const baseURLSocket = "http://localhost:5001";
  const socket = io(baseURLSocket);

  function joinRoom(idDialog) {
    socket.emit('joinRoom', idDialog);
  }

  function sendMessage(idDialog, messageText) {

    const data = {
      idUser: idUser,
      roomId: idDialog,
      message: messageText
    };
    console.log(data)
    socket.emit('sendMessage', data);
  }

  function reciveMessage() {
    return new Promise((resolve, reject) => {
      socket.on('reciveMessage', (data) => {
        console.log('message from server:', data);
        resolve(data);
      });
    });
  }

  return { joinRoom, sendMessage, reciveMessage }
});