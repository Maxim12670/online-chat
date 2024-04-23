const db = require('../db');

class Validator {

  async ValidEmail(email) {
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
  }

  async ValidPassword(email, password) {
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
  }

  async ValidId(id, tableName) {
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
  }

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
  }
}

module.exports = new Validator();