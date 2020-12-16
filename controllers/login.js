const { jwtSign, } = require('../../config/jwt');

module.exports = [
  {
    type: 'post',
    url: 'gateway/user/login',
    success: (ctx) => {
      const { username } = ctx.request.body;
      const token = jwtSign(ctx.request.body)
      ctx.cookies.set('AUTH_TOKEN', token)
      ctx.body = {
        code: 200,
        username,
      };
    }
  }
]