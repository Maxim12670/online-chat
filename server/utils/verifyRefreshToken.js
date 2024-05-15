const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyRefreshToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.token.ACCESS_SECRET_KEY, (err, user) => {
      if(err) {
        return res.status(403).json("Токен не валидный!");
      }
      req.user = user;
      next();
    })
  } else {
    return res.status(401).json("Вы не авторизованы!");
  }
}

module.exports = verifyRefreshToken;