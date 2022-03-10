const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const connection = require('./db.connect');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    // const connection = await mysql.createConnection({ host, port, user, password });

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Order = require('../api/api.order.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}