
const configFile = require('./configuration');
const mysql = require('mysql');
const logger = require('../utils/logger');
const mysqlPromise = require('promise-mysql');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(configFile.database, configFile.user, configFile.password, {
    host: configFile.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.log('Unable to connect to the database:', err);
});
var pool = mysqlPromise.createPool({
    host: configFile.host,
    user: configFile.user,
    password: configFile.password,
    database: configFile.database,
    connectionLimit: 30
});

function getSqlConnection() {
    return pool.getConnection().disposer(connection => {
        pool.releaseConnection(connection);
    });
}

module.exports.getSqlConn = getSqlConnection;

