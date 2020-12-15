const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/mysql');
const { jwtSign, jwtVerify } = require('./config/jwt');
const checkToken = require('./middleware/check-token');

const app = new Koa();
const router = new Router();

app.use(checkToken);

const sequelizeSql = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  }
)

const User = sequelizeSql.define('User',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    user_name: DataTypes.STRING,
    login_name: DataTypes.STRING,
    login_password: DataTypes.STRING,
  },
  {
    tableName: 'koa_user',
    timestamps: false
  },
);

(async () => {
  await sequelizeSql.sync({ force: true });
  // 这里是代码
  // 创建一个新用户
  const user = await User.create({ user_name: 'Jane', login_name: 'Doe', login_password: '123' });
})();

router.post('/gateway/user/login', (ctx) => {
  const { username } = ctx.request.body;
  const token = jwtSign(ctx.request.body)
  ctx.cookies.set('AUTH_TOKEN', token)
  ctx.body = {
    code: 200,
    username,
  };
})

router.post('/gateway/user/test', (ctx) => {
  ctx.body = {
    code: 200,
    data: 'success'
  };
})

app.use(bodyParser());
app.use(router.routes());

app.listen(3000, () => {
  console.log('app is running on 3000 port')
});