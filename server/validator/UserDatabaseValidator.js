const db = require('../db');

class UserDatabaseValidator {
  // проверка зарегистрирована почта или нет 
  async emailExistsDatabase(email) {
    try {
      const result = await db.query('SELECT COUNT(*) FROM person WHERE email = $1', [email]);
      if (result.rows[0].count > 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.log('Произошла ошибка', error);
      return false;
    }
  };
  // проверка корректный пароль или нет
  async passwordExistsDatabase(email, password) {
    try {
      const passwordUser = await db.query('SELECT password FROM person WHERE email = $1', [email]);
      if (password !== passwordUser.rows[0].password) {
        return false
      }
      return true;
    } catch (error) {
      console.log('Произошла ошибка:', error);
      return false;
    }
  };
  // проверка существует id в таблице или нет
  async idExistsDatabase(id, tableName) {
    try {
      const result = await db.query(`SELECT COUNT(*) FROM ${tableName} WHERE id = $1`, [id]);
      if (result.rows[0].count == 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.log('Произошла ошибка', error);
      return false;
    }
  };
  // получить старые значения пользователя
  async GetOldValueUser(id) {
    try {
      const oldUser = await db.query('SELECT * FROM person WHERE id = $1', [id]);
      if (oldUser.rows[0] == undefined) {
        return [false];
      }
      return [true, oldUser.rows[0]];
    } catch (error) {
      console.log('Произошла ошибка', error);
      return [false];
    }
  };
};

module.exports = new UserDatabaseValidator();