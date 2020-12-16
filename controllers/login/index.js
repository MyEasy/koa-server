const Router = require('koa-router');
const { jwtSign, } = require('../../config/jwt');

const router = new Router();

router.post('gateway/user/login', (ctx) => {
  const { username } = ctx.request.body;
  const token = jwtSign(ctx.request.body)
  ctx.cookies.set('AUTH_TOKEN', token)
  ctx.body = {
    code: 200,
    username,
  };
})

router.post('gateway/user/test', (ctx) => {
  ctx.body = {
    code: 200,
    data: 'success'
  };
})

module.exports = router.routes();