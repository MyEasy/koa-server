const Router = require('koa-router');
const router = new Router();
const login = require('./login');

router.use('/', login);

module.exports = router;