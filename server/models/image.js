import { sequelize } from '../utils/db'
import { Sequelize, Model } from 'sequelize';

class Image extends Model {}
Image.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: Sequelize.STRING,
  from: Sequelize.STRING,
}, {
  sequelize,
  tableName: 'image'
});

module.exports = {
  Image,
}