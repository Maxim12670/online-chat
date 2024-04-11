const db = require('../db');
const validator = require('../validator/validator');

// recipient - получатель
// sender - отправитель
const Status = {Friends: 'friends', Sender: 'sender', Recipient: 'recipient'}

class FriendController {
  async sendRequestToFriends(req, res) {
    try {

    } catch(error) {
      console.log(error);
      res.status(400).json({message: 'Ошибка при отправке запроса в друзья!'})
    }
  };
  async answerFriendRequest(req, res) {
    try {

    } catch(error) {
      console.log(error);
      res.status(400).json({message: 'Ошибка при отправке ответа на запрос!'})
    }
  };
  async removeFromFriends(req, res) {
    try {

    } catch(error) {
      console.log(error);
      res.status(400).json({message: 'Ошибка при удалении из друзей!'})
    }
  };

}


module.exports = new FriendController();