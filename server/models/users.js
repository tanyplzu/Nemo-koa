import sequelize from '../utils/db'
import { Sequelize, Model } from 'sequelize';

class User extends Model {}
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  },
  nickname: Sequelize.STRING,
}, {
  sequelize,
  tableName: 'user'
})
module.exports = {
  User
}