const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', 'secreto', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;