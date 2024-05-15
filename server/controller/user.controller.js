const db = require('../db');
const { validationResult } = require('express-validator')
const userDatabaseValidator = require('../validator/UserDatabaseValidator');
const generateAccessToken = require('../utils/generateAccessToken');
const generateRefreshToken = require('../utils/generateRefreshToken');

const findNewValue = (oldUser, newUser) => {
  const newValue = {};

  for (let key in oldUser) {
    const newV = newUser[key]
    const oldV = oldUser[key]
    const isValueChanged = (newV != 'null') && (newV != undefined) && (newV != '') && (oldV !== newV)

    newValue[key] = isValueChanged ? newV : oldV;
  }
  return newValue;
}

class UserController {
  // обновление данных пользователя
  static async updateUser(req, res) {
    try {
      const { id, email, name, surname, password, age, city } = req.body;
      const image = req.file;

      const [booleanFlag, oldUser] = await userDatabaseValidator.GetOldValueUser(id);

      if (!booleanFlag) {
        return res.status(400).json({ message: 'Пользователь не найден!' });
      }

      const newUser = {
        id, email, name, surname, password, age, city,
        image: image ? image.path : "images\default_avatar.jpg",
      };

      const newValue = findNewValue(oldUser, newUser);
      const user = await db.query(
        `UPDATE person set email = $1, name = $2, surname = $3, password = $4,
        image = $5, age = $6, city = $7
        where id = $8 RETURNING *`,
        [newValue.email, newValue.name, newValue.surname, newValue.password,
        newValue.image, newValue.age, newValue.city, id]
      );
      return res.clearCookie('userData')
        .cookie('userData', JSON.stringify(user.rows[0]))
        .status(200).json(user.rows[0]);
    } catch (e) {
      return res.status(400).json({ message: `Произошла ошибка при обновление данных!` });
    }
  };
  // создать пользователя
  static async createUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации!", errors })
      }
      const { email, name, surname, password } = req.body;
      const isValidEmail = await userDatabaseValidator.emailExistsDatabase(email)
      if (!isValidEmail) {
        return res.status(400).json({ message: 'Email занят!' });
      }

      const newPerson = await db.query(
        `INSERT INTO person (email, name, surname, password) 
        values ($1, $2, $3, $4) RETURNING *`,
        [email, name, surname, password]);
      return res.json(newPerson.rows[0]);

    } catch (e) {
      return res.status(400).json({ message: 'Ошибка при регистрации!' });
    }
  };
  // авторизация
  static async authUser(req, res) {
    try {
      const { email, password } = req.body;
      const isValidEmail = await userDatabaseValidator.emailExistsDatabase(email);
      if (isValidEmail) {
        return res.status(400).json({ message: 'Почта не зарегистрирована!' });
      }
      const isValidPassword = await userDatabaseValidator.passwordExistsDatabase(email, password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Пароль неверный!' });
      }
      // генерация токенов
      const result = await db.query(
        'SELECT * FROM person WHERE email = $1', [email]);

      const userData = result.rows[0];
      const accessToken = generateAccessToken(userData);
      const refreshToken = generateRefreshToken(userData);

      // запись в таблицу токенов
      await db.query(`
        INSERT INTO user_tokens (user_id, token)
        VALUES ($1, $2)`, [userData.id, refreshToken]);

      return res.status(200).json({
        ...userData,
        accessToken,
        refreshToken
      });

    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Ошибка при авторизации!' });
    }
  };
  // получить данные пользователя
  static async getUserData(req, res) {
    try {
      const { id } = req.body;
      const isValidId = await userDatabaseValidator.idExistsDatabase(id, 'person');

      if (!isValidId) {
        return res.status(400).json({ message: `Пользователь с id: ${id} не найден` });
      }
      const userData = await db.query(
        'SELECT * FROM person WHERE id = $1', [id]);

      // const userData = await db.query(`SELECT * FROM user_tokens WHERE user_id = $1`, [id]);
      // return res.cookie('userData', JSON.stringify(userData.rows[0])).status(200).json(userData.rows[0]);
      
      const accessToken = req.headers.authorization.split(" ")[1];
      return res.cookie('userData', JSON.stringify(accessToken)).status(200).json(userData.rows[0]);

    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Произошла ошибка поиска пользователя!' });
    }
  };
  // получить всех пользователей
  static async getAllUsers(req, res) {
    try {
      const { idUser } = req.query;
      const isUserIdValid = await userDatabaseValidator.idExistsDatabase(idUser, 'person');

      if (!isUserIdValid)
        return res.status(400).json({ message: 'Такого пользователя не существует!' });

      const users = await db.query(`SELECT * FROM person WHERE id != $1`, [idUser]);
      return res.json(users.rows);

    } catch (e) {
      console.log('Error', e)
      return res.status(400).json({ message: 'Произошла ошибка при поиске всех пользователей!' });
    }
  };
  // выйти из аккаунта
  static async logout(req, res) {
    try {
      const { id } = req.body;
      const isValidId = await userDatabaseValidator.idExistsDatabase(id, 'person');
      if (!isValidId) {
        return res.status(400).json({ message: `Не удалось удалить пользователя с id: ${id}` })
      }

      await db.query(`DELETE FROM user_tokens WHERE user_id = $1`, [id]);

      return res.clearCookie('userData').status(200).json({ message: 'Пользователь успешно вышел из системы!' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Произошла ошибка при выходе из аккаунта!' })
    }
  }
  // удалить пользователя
  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const isValidId = await userDatabaseValidator.idExistsDatabase(id, 'person');
      if (!isValidId) {
        return res.status(400).json({ message: `Не удалось удалить пользователя с id: ${id}` });
      }
      const user = await db.query(
        'DELETE FROM person WHERE id = $1', [id]);
      return res.json(user.rows[0]);
    } catch (e) {
      return res.status(400).json({ message: 'Произошла ошибка при удалении пользователя!' })
    }
  };
}

module.exports = UserController;