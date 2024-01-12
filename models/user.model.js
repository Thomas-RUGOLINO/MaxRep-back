const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize-client');

class User extends Model {}

User.init({
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    firstname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATE,
    },
    city: {
        type: DataTypes.TEXT,
    },
    country: {
        type: DataTypes.TEXT,
    },
    gender: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
    },
    height: {
        type: DataTypes.INTEGER,
    },
    is_shared: {
        type: DataTypes.BOOLEAN,
    },
    profile_picture: {
        type: DataTypes.TEXT,
    },
    
}, {
    sequelize,
    tableName: 'user'
});

module.exports = User;