import { sequelize } from '../utils/db'
import Sequelize from 'sequelize';


class User extends Sequelize.Model {}
User.init({
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
}, { sequelize, modelName: 'user' });


module.exports = {
  User,
}