const db = require('../db');
const { validationResult } = require('express-validator')
const validator = require('../validator/validator');

const findNewValue = (oldUser, newUser) => {
  const newValue = {};
  const keys = Object.keys(oldUser);

  for (let key of keys) {
    if (oldUser[key] !== newUser[key] && newUser[key] !== undefined) {
      newValue[key] = newUser[key];
    } else {
      newValue[key] = oldUser[key];
    }
  }
  return newValue;
}

class UserController {
  async createUser(req, res) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({message: "Ошибка при регистрации!", errors})
      }
      const { email, name, surname, password } = req.body;
      if (!validator.ValidEmail(email)) {
        return res.status(400).json({ message: 'Email занят!' });
      }
      const newPerson = await db.query('INSERT INTO person (email, name, surname, password) values ($1, $2, $3, $4) RETURNING *', [email, name, surname, password]);
      return res.json(newPerson.rows[0]);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка при регистрации!' });
    }
  }
  async getUser(req, res) {
    try {
      const id = req.params.id;
      if (!validator.ValidId(id)) {
        return res.status(400).json({ message: `Пользователь с id: ${id} не найден` })
      }
      const user = await db.query('SELECT * FROM person where id = $1', [id]);
      return res.json(user.rows[0]);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Произошла ошибка поиска пользователя!' })
    }
  }
  async getAllUsers(req, res) {
    try {
      const users = await db.query('SELECT * FROM person');
      res.json(users.rows);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Произошла ошибка при поиске всех пользователей!' });
    }
  }
  async updateUser(req, res) {
    try {
      const { id, email, name, surname, password, image } = req.body;

      const [booleanFlag, oldUser] = await validator.UpdateValueUser(id);

      if (!booleanFlag) {
        return res.status(400).json({ message: 'Пользователь не найден!' });
      }

      const newUser = {
        'email': email,
        'name': name,
        'surname': surname,
        'password': password,
        'image': image
      }

      const newValue = findNewValue(oldUser, newUser)
      console.log(newValue.email)


      const user = await db.query(
        'UPDATE person set email = $1, name = $2, surname = $3, password = $4, image = $5 where id = $6 RETURNING *',
        [newValue.email, newValue.name, newValue.surname, newValue.password, newValue.image, id]
      );
      return res.json(user.rows[0]);
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Произошла ошибка при обновление данных!' })
    }
  }
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      if (!validator.ValidId(id)) {
        return res.status(400).json({ message: `Не удалось удалить пользователя с id: ${id}` });
      }
      const user = await db.query('DELETE FROM person where id = $1', [id]);
      res.json(user.rows[0]);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Произошла ошибка при удалении пользователя!' })
    }
  }
}

module.exports = new UserController();