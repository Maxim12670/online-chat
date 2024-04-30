const db = require('../db');
const userDatabaseValidator = require('../validator/UserDatabaseValidator');
const dialogDatabaseValidator = require('../validator/DialogDatabaseValidator');

class MessageController {
  // отправка сообщения
  static async createMessage(req, res) {
    try {
      const { idUser, idDialog, messageText } = req.body;
      const isValidIdUser = await userDatabaseValidator.idExistsDatabase(idUser, 'person');

      if (!isValidIdUser) {
        return res.status(400).json({ message: 'Такого пользователя не существует!' })
      }

      const isValidIdDialog = await dialogDatabaseValidator.dialogExists(idDialog);
      if (!isValidIdDialog) {
        return res.status(400).json({ message: 'Диалога не существует!' });
      }

      const result = await db.query(
        `INSERT INTO message (id_room, id_user, message_text)
        VALUES ($1, $2, $3) RETURNING *`, [idDialog, idUser, messageText]);

      return res.json(result.rows[0]);
    } catch (error) {
      console.log('Error', error);
      return res.status(400).json({ message: 'Ошибка во время отправки сообщения!' });
    }
  };
  // получение всех сообщения в конкретном диалоге
  static async getAllMessageDialog(req, res) {
    try {
      const { idUser, idDialog } = req.query;
      const isValidId = await userDatabaseValidator.idExistsDatabase(idUser, 'person');

      if (!isValidId) {
        return res.status(400).json({ message: 'Такого пользователя не существует!' });
      }

      const isValidIdDialog = await dialogDatabaseValidator.dialogExists(idDialog);

      if (!isValidIdDialog) {
        return res.status(400).json({ message: 'Диалога не существует!' });
      }

      const result = await db.query(
        `SELECT *,
          CASE 
              WHEN id_user = $1 THEN 'user-message'
              ELSE 'friend-message'
          END AS status
        FROM 
            message
        WHERE 
            id_room = $2;`, [idUser, idDialog]);

      console.log('messages:', result.rows);
      return res.json(result.rows);
    } catch (error) {
      console.log('Error', error);
      return res.status(400).json({ message: 'Ошибка во время получения сообщений диалога!' });
    }
  };
}

module.exports = MessageController;
