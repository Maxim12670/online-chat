import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { io } from "socket.io-client";

export const useSocketStore = defineStore('socketStore', () => {
  
  const userData = useUserStore;
  const baseURLSocket = "http://localhost:5001";
  const socket = io(baseURLSocket);

  function joinRoom(idDialog) {
    socket.emit('joinRoom', idDialog);
  }

  function sendMessage(idDialog, messageText) {
    
    // добавить id пользователя
    const data = {
      roomId: idDialog,
      message: messageText
    };
    console.log(data)
    socket.emit('sendMessage', data);
  }

  socket.on('reciveMessage', (data) => {
    console.log('message from server:', data);
  });

  return { joinRoom, sendMessage }
});