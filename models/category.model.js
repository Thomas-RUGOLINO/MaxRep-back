const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize-client');

class Category extends Model{}

Category.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    tableName: 'category'
});

module.exports = Category;