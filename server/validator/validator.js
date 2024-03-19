const db = require('../db');

class Validator {

  async ValidEmail(email) {
    try {
      const result = await db.query('SELECT COUNT(*) FROM person WHERE email = $1', [email]);
      if (result.rows[0].count > 1) {
        return false;
      }
      return true;
    } catch (error) {
      console.log('Произошла ошибка', error);
      return false;
    }
  }

  async ValidId(id) {
    try {
      const result = await db.query('SELECT COUNT(*) FROM person WHERE id = $1', [id]);
      if (result.rows[0].count == 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.log('Произошла ошибка', error);
      return false;
    }
  }

  async UpdateValueUser(id) {
    try {
      const oldUser = await db.query('SELECT * FROM person WHERE id = $1', [id]);
      if (oldUser.rows[0] == undefined) {
        return [false];
      }
      return [true, oldUser.rows[0]];
    } catch (error) {
      console.log('Произошла ошибка', error);
      return [false]
    }
  }

}

module.exports = new Validator();