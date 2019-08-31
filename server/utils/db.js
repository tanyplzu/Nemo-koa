// import Sequelize from 'sequelize';
const Sequelize = require('sequelize')
import { database } from '../../config/dbConfig'
import { flush } from 'pm2';
const { dbName, user, password, host, port, dialect, logging } = database

const sequelize = new Sequelize(dbName, user, password, {
  dialect,
  host,
  port,
  logging,
  timezone: '+08:00',
  define: {
    freezeTableName: true,
    timestamps: true, // 三个时间
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: 'delete_time',
    // 把驼峰命名转换为下划线
    underscored: true
  }
});
sequelize.sync({force: false})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = {
  sequelize
}

