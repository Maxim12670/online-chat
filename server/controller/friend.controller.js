const db = require('../db');
const validator = require('../validator/validator');
const validatorFriend = require('../validator/friend');

// active - пара пользователей является друзьями
// await - пользователь 1 ожидает ответа
const Status = { Active: 'active', Await: 'await' }

class FriendController {
  async sendRequestToFriends(req, res) {
    try {
      const { id_sender, id_recipient } = req.body;
      const isValidFirst = await validator.ValidId(id_sender, 'person');
      const isValidSecond = await validator.ValidId(id_recipient, 'person');

      if (!isValidFirst || !isValidSecond) {
        return res.status(400).json({ message: 'Пользователь не найден!' });
      }

      const isValidPair = await validatorFriend.ValidPair(id_sender, id_recipient);
      const isOnlyPair = await validatorFriend.OnlyPair(id_sender, id_recipient);
      if (isValidPair && isOnlyPair) {
        const newPair = await db.query(`INSERT INTO friends (id_sender, id_recipient, status) values ($1, $2, $3) RETURNING *`,
          [id_sender, id_recipient, Status.Await]);
        return res.json(newPair.rows[0])
      }
      return res.status(400).json({ message: 'Такая пара уже существует' });
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка при отправке запроса в друзья!' });
    }
  };

  async answerFriendRequest(req, res) {
    try {
      const { id_sender, id_recipient, status } = req.body;
      const isValidFirst = await validator.ValidId(id_sender, 'person');
      const isValidSecond = await validator.ValidId(id_recipient, 'person');

      if (!isValidFirst || !isValidSecond) {
        return res.status(400).json({ message: 'Нет такого пользователя!' });
      }

      if (status === false) {
        await db.query(`DELETE FROM friends WHERE id_sender = ${id_sender} AND id_recipient = ${id_recipient}`);
        return res.status(200).json({ message: 'Пара удалена' });
      }
      const result = await db.query(`UPDATE friends SET status = $1 WHERE id_sender = $2 and id_recipient = $3 RETURNING *`,
        [Status.Active, id_sender, id_recipient]);
      return res.json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ message: 'Ошибка при отправке ответа на запрос!' })
    }
  };

  async removeFromFriends(req, res) {
    try {
      const { firstUser, secondUser } = req.body;
      const isValidFirst = await validator.ValidId(firstUser, 'person');
      const isValidSecond = await validator.ValidId(secondUser, 'person');

      if (!isValidFirst || !isValidSecond) {
        return res.status(400).json({ message: 'Пользователь не найден!' });
      }

      const isPairExist = await validatorFriend.OnlyPair(firstUser, secondUser);

      if (isPairExist === false) {
        await db.query(`
        DELETE FROM friends WHERE (id_sender = $1 AND id_recipient = $2 AND status = $3)
        OR (id_sender = $2 AND id_recipient = $1 AND status = $3)`,
          [firstUser, secondUser, Status.Active]);
        return res.status(200).json({ message: 'Пара удалена' });
      }

      return res.status(400).json({ message: 'Такой пары друзей нет!' })
    } catch (error) {
      res.status(400).json({ message: 'Ошибка при удалении из друзей!' })
    }
  };

  async getFriends(req, res) {
    try {
      const { idUser } = req.body;
      const isValidId = await validator.ValidId(idUser, 'person');

      if (isValidId == true) {
        const result = await db.query(`
        SELECT 
          CASE 
            WHEN id_sender = $1 THEN id_recipient
            ELSE id_sender
          END AS id_found
        FROM 
          friends 
        WHERE 
          ($1 IN (id_sender, id_recipient)) 
          AND status = $2;`,
          [idUser, Status.Active]);
        return res.json(result.rows);
      }
      return res.status(400).json({ message: 'Такого пользователя нет!' });
    } catch (error) {
      return res.status(200).json({ message: 'Ошибка на сервере!' })
    }
  };

  // получение всех подписчиков
  async getFollowers(req, res) {
    try {
      const { idUser } = req.body;
      const isValidId = await validator.ValidId(idUser, 'person');

      if (isValidId == true) {
        const result = await db.query(`
          SELECT id_sender AS id_found
          FROM friends
          WHERE id_recipient = $1 AND status = $2`,
          [idUser, Status.Await]);
        return res.json(result.rows);
      }
      return res.status(400).json({ message: 'Такого пользователя нет!' });
    } catch (error) {
      return res.status(200).json({ message: 'Ошибка на сервере!' })
    }
  };

  // получить все подписки
  async getSubscriptions(req, res) {
    try {
      const { idUser } = req.body;
      const isValidId = await validator.ValidId(idUser, 'person');

      if (isValidId == true) {
        const result = await db.query(`
        SELECT id_recipient AS id_found
        FROM friends
        WHERE id_sender = $1 AND status = $2`,
          [idUser, Status.Await]);
        return res.json(result.rows);
      }
      return res.status(400).json({ message: 'Такого пользователя нет!' });
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка на сервере!' })
    }
  };
}


module.exports = new FriendController();