const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize-client');

class Best_performance extends Model {}

Best_performance.init({
    best_score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'best_performance'
});

module.exports = Best_performance;