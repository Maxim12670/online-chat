const db = require('../db');

class ValidatorDialog {
  // проверка создан диалог или нет
  async dialogExists(firstUser, secondUser) {
    try {
      const result = await db.query(
        `SELECT * FROM dialog_room
        WHERE (id_first_user = $1 AND id_second_user = $2)
        OR (id_first_user = $2 AND id_second_user = $1)`,
        [firstUser, secondUser]);

      if (result.rowCount > 0) {
        return false;
      }

      return true;

    } catch (error) {
      console.log('Произошла ошибка:', error);
      return false;
    }
  }
}

module.exports = new ValidatorDialog();