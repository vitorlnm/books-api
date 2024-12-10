const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');
const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = { sequelize, Book };
