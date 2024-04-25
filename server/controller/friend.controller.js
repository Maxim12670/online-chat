const db = require('../db');
const validator = require('../validator/UserDatabaseValidator');
const validatorFriend = require('../validator/FriendsDatabaseValidator');

// active - пара пользователей является друзьями
// await - пользователь 1 ожидает ответа
const Status = { Active: 'active', Await: 'await' }

class FriendController {
  // отправить запрос
  static async sendRequestToFriends(req, res) {
    try {
      const { id_sender, id_recipient } = req.body;
      const isValidFirst = await validator.idExistsDatabase(id_sender, 'person');
      const isValidSecond = await validator.idExistsDatabase(id_recipient, 'person');

      if (!isValidFirst || !isValidSecond) {
        return res.status(400).json({ message: 'Пользователь не найден!' });
      }

      const isValidPair = await validatorFriend.canAddFriend(id_sender, id_recipient);

      if (!isValidPair) {
        return res.status(400).json({ message: 'Такая пара уже существует' });
      }

      const newPair = await db.query(
        `INSERT INTO friends (id_sender, id_recipient, status)
         values ($1, $2, $3) RETURNING *`,
        [id_sender, id_recipient, Status.Await]);
      return res.json(newPair.rows[0])
      
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка при отправке запроса в друзья!' });
    }
  };
  // дать ответ на запрос
  static async answerFriendRequest(req, res) {
    try {
      const { id_sender, id_recipient, status } = req.body;
      const isValidFirst = await validator.idExistsDatabase(id_sender, 'person');
      const isValidSecond = await validator.idExistsDatabase(id_recipient, 'person');

      if (!isValidFirst || !isValidSecond) {
        return res.status(400).json({ message: 'Нет такого пользователя!' });
      }

      if (status === false) {
        await db.query(
          `DELETE FROM friends 
          WHERE id_sender = $1 AND id_recipient = $2`,
          [id_sender, id_recipient]);
        return res.status(200).json({ message: 'Пара удалена' });
      }
      const result = await db.query(
        `UPDATE friends SET status = $1 
        WHERE id_sender = $2 and id_recipient = $3 RETURNING *`,
        [Status.Active, id_sender, id_recipient]);
      return res.json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ message: 'Ошибка при отправке ответа на запрос!' })
    }
  };
  // удалить пару друзей
  static async removeFromFriends(req, res) {
    try {
      const { firstUser, secondUser } = req.body;
      const isValidFirst = await validator.idExistsDatabase(firstUser, 'person');
      const isValidSecond = await validator.idExistsDatabase(secondUser, 'person');
      const isValidFriendPair = await validatorFriend.friendPairExists(firstUser, secondUser)

      if (!isValidFirst && !isValidSecond) {
        return res.status(400).json({ message: 'Пользователь не найден!' });
      }

      if (!isValidFriendPair) {
        return res.status(400).json({ message: 'Пара друзей не существует, ее нельзя удалить!' });
      }

      await db.query(`
        DELETE FROM friends 
        WHERE (id_sender = $1 AND id_recipient = $2 AND status = $3)
        OR (id_sender = $2 AND id_recipient = $1 AND status = $3)`,
        [firstUser, secondUser, Status.Active]);
      return res.status(200).json({ message: 'Пара удалена' });


    } catch (error) {
      res.status(400).json({ message: 'Ошибка при удалении из друзей!' })
    }
  };
  // получить всех друзей
  static async getFriends(req, res) {
    try {
      const { idUser } = req.body;
      const isValidId = await validator.idExistsDatabase(idUser, 'person');

      if (isValidId) {
        const friendsQuery = await db.query(`
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

        const friends = friendsQuery.rows;
        const usersData = [];
        for (const friend of friends) {
          const userQuery = await db.query(
            'SELECT * FROM person WHERE id = $1', [friend.id_found]);
          const userData = userQuery.rows[0];
          usersData.push(userData);
        }

        return res.json(usersData);
      }
      return res.status(400).json({ message: 'Такого пользователя нет!' });
    } catch (error) {
      return res.status(200).json({ message: 'Ошибка на сервере!' })
    }
  };
  // получить всех подписчиков
  static async getFollowers(req, res) {
    try {
      const { idUser } = req.body;
      const isValidId = await validator.idExistsDatabase(idUser, 'person');

      if (isValidId) {
        const followersQuery = await db.query(`
          SELECT id_sender AS id_found
          FROM friends
          WHERE id_recipient = $1 AND status = $2`,
          [idUser, Status.Await]);

        const followers = followersQuery.rows;
        const usersData = [];

        for (const follower of followers) {
          const userQuery = await db.query(
            'SELECT * FROM person WHERE id = $1', [follower.id_found]);
          const userData = userQuery.rows[0];
          usersData.push(userData);
        }
        return res.json(usersData);
      }
      return res.status(400).json({ message: 'Такого пользователя нет!' });
    } catch (error) {
      return res.status(200).json({ message: 'Ошибка на сервере!' });
    }
  };
  // получить все подписки
  static async getSubscriptions(req, res) {
    try {
      const { idUser } = req.body;
      const isValidId = await validator.idExistsDatabase(idUser, 'person');

      if (isValidId) {
        const subscriptionsQuery = await db.query(`
                SELECT id_recipient AS id_found
                FROM friends
                WHERE id_sender = $1 AND status = $2`,
          [idUser, Status.Await]);

        const subscriptions = subscriptionsQuery.rows;

        const usersData = [];
        for (const subscr of subscriptions) {
          const userQuery = await db.query(
            'SELECT * FROM person WHERE id = $1', [subscr.id_found]);
          const userData = userQuery.rows[0];
          usersData.push(userData);
        }

        return res.json(usersData);
      }

      return res.status(400).json({ message: 'Такого пользователя нет!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка на сервере!' });
    }
  };
}

module.exports = FriendController;