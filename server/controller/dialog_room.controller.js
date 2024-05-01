const db = require('../db');
const UserValueValidator = require('../validator/UserDatabaseValidator');
const DialogValidator = require('../validator/DialogDatabaseValidator');

class DialogRoomController {
  // создание диалога
  static async createDialog(req, res) {
    try {
      const { idUser, idCompanion } = req.body;
      const isValidFirstUser = await UserValueValidator.idExistsDatabase(idUser, 'person');
      const isValidSecondUser = await UserValueValidator.idExistsDatabase(idCompanion, 'person');

      if (!isValidFirstUser || !isValidSecondUser) {
        return res.status(400)
          .json({ message: 'Такого пользователя не существует!' });
      }

      const isValidDialog = await DialogValidator.usersCanAddDialog(idUser, idCompanion);

      if (!isValidDialog) {
        return res.status(400).json({ message: 'Диалог уже создан!' })
      }

      const newDialog = await db.query(
        `INSERT INTO dialog_room
        (id_first_user, id_second_user) values ($1, $2) RETURNING *`,
        [idUser, idCompanion]);
      return res.json(newDialog.rows[0]);

    } catch (error) {
      console.log('Error', error)
      return res.status(400).json({ message: 'Ошибка при попытке создать диалог!' })
    }
  };
  // получить все диалоги пользователя
  static async getAllDialogsUser(req, res) {
    try {
      const { idUser } = req.query;
      const isValidIdUser = await UserValueValidator.idExistsDatabase(idUser, 'person');

      if (!isValidIdUser) {
        return res.status(400).json({ message: 'Такого пользователя нет!' });
      }

      const result = await db.query(
        `SELECT dialog_room.id AS dialog_id,
          CASE
              WHEN dialog_room.id_first_user = $1 THEN dialog_room.id_second_user
              ELSE dialog_room.id_first_user
          END AS id_companion,
          person.name AS name_companion,
          person.surname AS surname_companion,
          person.image AS image_companion
        FROM 
            dialog_room
        JOIN 
            person ON 
            CASE
                WHEN dialog_room.id_first_user = $1 THEN dialog_room.id_second_user
                ELSE dialog_room.id_first_user
            END = person.id
        WHERE 
            dialog_room.id_first_user = $1 OR dialog_room.id_second_user = $1;`, [idUser]);

      console.log(result.rows[0])
      return res.json(result.rows[0]);

    } catch (error) {
      console.log('Error', error);
      return res.status(400).json({ message: 'Ошибка при попытке получить все диалоги пользователя!' });
    }
  };
}

module.exports = DialogRoomController;