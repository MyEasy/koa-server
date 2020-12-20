const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User',
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

module.exports = User;