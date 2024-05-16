const db = require('../db');
const jwt = require('jsonwebtoken');
const config = require('../config')
const generateAccessToken = require('../utils/generateAccessToken');
const generateRefreshToken = require('../utils/generateRefreshToken');

class RefreshToken {
  static async refreshToken(req, res) {
    try {
      const refreshToken = req.body.token;

      if (!refreshToken) {
        return res.status(403).json("Вы не авторизованы!");
      }

      const result = await db.query(`
      SELECT * FROM user_tokens WHERE token = $1`, [refreshToken]);
      const tokenData = result.rows[0];

      if (!tokenData) {
        return res.status(403).json('Токен не валидный!');
      }

      jwt.verify(refreshToken, config.token.REFRESH_SECRET_KEY, async (err, user) => {
        err && console.log(err);

        await db.query(`DELETE FROM user_tokens WHERE token = $1`, [refreshToken]);

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        await db.query(`
        INSERT INTO user_tokens (user_id, token)
        VALUES ($1, $2)`, [user.id, newRefreshToken]);

        return res
          .status(200)
          .cookie('userData', newRefreshToken, { httpOnly: true })
          .json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
          })
      })

    } catch (error) {
      console.log('ошибка при обновлении токена', error);
      return res.status(400).json({ message: 'Ошибка при обновлении токена!' });
    }
  };
}

module.exports = RefreshToken;