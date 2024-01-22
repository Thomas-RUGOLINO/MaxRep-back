const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize-client');

class Session extends Model {}

Session.init({
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize,
    tableName: 'session'
});

module.exports = Session;