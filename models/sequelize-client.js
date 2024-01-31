// Desc: Sequelize client for connecting to the database
//we import dotenv and call config() to load the environment variables from .env file
require("dotenv").config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, 
    {
        define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true
        },
    
        logging: false
    }
);

module.exports = sequelize;