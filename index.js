const Koa = require('koa');
const router = require('./controllers');
const bodyParser = require('koa-bodyparser');
const checkToken = require('./middleware/check-token');
require('./entity');

const app = new Koa();

app.use(checkToken);

app.use(bodyParser());

app.use(router.routes());

app.listen(3000, () => {
  console.log('app is running on 3000 port')
});