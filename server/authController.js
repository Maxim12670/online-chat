const User = require("./models/User");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

const generateAccessToken = (id) => {
  const payload = {
    id
  }

  return jwt.sign(payload, secret, { expiresIn: "24h" });
}


class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации!", errors });
      }
      const { username, password } = req.body;
      const condidate = await User.findOne({ username });
      if (condidate) {
        return res.status(400).json({ message: "Пользователь с таким именем уже зарегистрирован!" })
      }
      const user = new User({ username, password });
      await user.save();
      return res.json({ message: "Пользователь успешно зарегистрирован!" });

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка при регистрации' })
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `Пользователь с именем ${username} не найден!` });
      }

      if (password != user.password) {
        return res.status(400).json({ message: "Пароль неверный!" });
      }

      const token = generateAccessToken(user._id);
      return res.json({ token });

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка при входе' });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new authController()