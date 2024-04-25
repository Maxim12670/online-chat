const db = require('../db');

class ValidatorFriend {
  // can add friend
  async canAddFriend(id_sender, id_recipient) {
    try {
      const result = await db.query(
        `SELECT id_sender 
        FROM friends 
        WHERE (id_sender = ${id_recipient} AND id_recipient = ${id_sender}`);
      console.log('count', result.count)
      if (result.rowCount > 0) {
        return false;
      }
      return true;

    } catch (error) {
      console.log('Произошла ошибка:', error)
      return false;
    }
  };

  async friendPairExists(id_sender, id_recipient) {
    try {
      const result = await db.query(
        `SELECT COUNT(*) FROM friends
        WHERE (id_sender = $1 AND id_recipient = $2 AND status = 'active')
        OR (id_sender = $2 AND id_recipient = $1 AND status = 'active')`,
        [id_sender, id_recipient]);
      if (result.rows[0].count <= 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };
}

module.exports = new ValidatorFriend();