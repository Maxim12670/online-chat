const db = require('../db');

class ValidatorFriend {
  async ValidPair(id_sender, id_recipient) {
    try {
      const result = await db.query(`SELECT id_sender FROM friends WHERE id_sender = ${id_recipient} AND id_recipient = ${id_sender}`)
      console.log(result.rowCount)
      if (result.rowCount > 0) {
        return false;
      }
      return true;

    } catch (error) {
      console.log('Произошла ошибка:', error)
      return false;
    }
  };

  async OnlyPair(id_sender, id_recipient) {
    try {
      const result = await db.query('SELECT COUNT(*) FROM friends WHERE id_sender = $1 AND id_recipient = $2', [id_sender, id_recipient]);
      if (result.rows[0].count > 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  }
}

module.exports = new ValidatorFriend();