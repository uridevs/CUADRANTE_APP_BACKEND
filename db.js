require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME_REMOTE, process.env.DB_USER_REMOTE, process.env.DB_PASS, {
    host: process.env.DB_HOST_REMOTE,
    dialect: 'mysql',
});

const Worker = require('./models/worker')(sequelize, DataTypes);
const Day = require('./models/day')(sequelize, DataTypes);
const Event = require('./models/event')(sequelize, DataTypes);
const User = require('./models/user')(sequelize, DataTypes);

sequelize.sync() // Solo creará las tablas si no existen
    .then(() => {
        console.log('Database & tables created or already exist!');
    })
    .catch(err => {
        console.error('Unable to create tables, shutting down...', err);
    });

module.exports = { sequelize, Worker, Day, Event, User };


