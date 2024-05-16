const jwt = require('jsonwebtoken');
const config = require('../config');

const generateRefreshToken = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email ? user.id : null,
    name: user.name ? user.name : null,
    surname: user.surname ? user.surname : null,
    age: user.age ? user.age : null,
    city: user.city ? user.city : null,
    password: user.password ? user.password : null,
    image: user.image ? user.image : null
  }, config.token.REFRESH_SECRET_KEY, {
    expiresIn: '30d'
  });
};

module.exports = generateRefreshToken;