import { sequelize } from '../utils/db'
import { Sequelize, Model } from 'sequelize';
import Image from './image';

class Banner extends Model {}
Banner.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'banner'
})

class BannerItem extends Sequelize.Model {}
BannerItem.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: Sequelize.STRING,
  key_word: Sequelize.STRING,
  img_id: Sequelize.INTEGER,
  banner_id: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'banner_item'
});

BannerItem.associate = function() {
  BannerItem.belongsTo(Banner, { as: 'items', foreignKey: 'banner_id', targetKey: 'id' });
  BannerItem.hasOne(Image, { as: 'items', foreignKey: 'img_id' });
}

module.exports = {
  Banner,
  BannerItem
}
