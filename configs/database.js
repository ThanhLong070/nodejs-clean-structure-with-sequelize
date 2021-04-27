const Sequelize = require('sequelize');
const signale = require('signale');

const SQL_DB = process.env.SQL_DB;
const SQL_USER = process.env.SQL_USER;
const SQL_PASSWORD = process.env.SQL_PASSWORD;
const SQL_HOST = process.env.SQL_HOST;

const sequelize = new Sequelize(SQL_DB, SQL_USER, SQL_PASSWORD, {
  dialect: 'mysql',
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: '+07:00', // for reading from database
  },
  timezone: '+07:00', // for writing to database
  host: SQL_HOST,
  logging: (str) => signale.info(str),
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
});

module.exports = sequelize;
