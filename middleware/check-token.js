const jwt = require('jsonwebtoken');

const checkToken = async (ctx, next) => {
  const url = ctx.request.url;
  if (url === '/gateway/user/login') await next();
  else {
    const token = ctx.cookies.get('AUTH_TOKEN');
    // invalid token - synchronous
    let payload = null;
    try {
      payload = jwt.verify(token, 'secret');
      await next()
    } catch(err) {
      // token expired
      ctx.body = {
        code: 401,
        message: 'token 已过期'
      }
    }
  }
}

module.exports = checkToken;