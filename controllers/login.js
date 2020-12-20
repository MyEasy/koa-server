const { jwtSign, } = require('../config/jwt');
const User = require('../entity/user');
const ERROR_CODE = require('../config/error-code');

module.exports = [
  {
    type: 'post',
    url: '/gateway/user/login',
    success: async (ctx) => {
      const { username, password } = ctx.request.body;
      let ctxBody = null;
      if (username !== null && password !== null) {
        const data = await User.findAll({
          where: {
            login_name: username
          }
        });
        if (data && data.length === 0) {
          await User.create({
            user_name: username,
            login_name: username,
            login_password: password,
          })
        } else {
          if (data[0].login_name === username && data[0].login_password === password) {
            ctxBody = {
              code: 200,
              username,
            }
          } else {
            ctxBody = {
              code: 1002,
              message: ERROR_CODE[1002],
            }
          }
        }
      } else {
        ctxBody = {
          code: 1001,
          message: ERROR_CODE[1001],
        }
      }
      const token = jwtSign(ctx.request.body)
      ctx.cookies.set('AUTH_TOKEN', token)
      ctx.body = ctxBody;
    }
  },
]