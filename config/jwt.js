const jwt = require('jsonwebtoken');

const jwtSign = (user) => {
  const token = jwt.sign(user, 'secret', { expiresIn: '1d' })
  return token;
};

const jwtVerify = (token) => {
  const data = jwt.verify(token, 'secret');
  return data;
}

module.exports = {
  jwtSign,
  jwtVerify,
}