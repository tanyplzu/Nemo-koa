import { sequelize } from '../utils/db'
import { Sequelize, Model } from 'sequelize';
import Image from './image';

class Banner extends Model {}
Banner.init({
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING(50),
  description: Sequelize.STRING(255),
}, {
  sequelize,
  modelName: 'banner'
})

class BannerItem extends Sequelize.Model {}
BannerItem.init({
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  type: Sequelize.BOOLEAN(4),
  key_word: Sequelize.STRING(100),
  img_id: Sequelize.INTEGER(11),
  banner_id: Sequelize.INTEGER(11),
}, {
  sequelize,
  tableName: 'banner_item'
});

BannerItem.associate = () => {
  BannerItem.belongsTo(Banner, { as: 'items', foreignKey: 'banner_id', targetKey: 'id' });
  // BannerItem.hasOne(Image, { as: 'items', foreignKey: 'img_id' });
}

module.exports = {
  Banner,
  BannerItem
}
