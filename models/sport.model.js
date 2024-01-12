const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize-client');

class Sport extends Model {}

Sport.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    unit: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'sport'
});

module.exports = Sport;