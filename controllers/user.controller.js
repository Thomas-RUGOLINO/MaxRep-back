const { User } = require("../models");

async function getAllUsers(req, res) {
    const users = await User.findAll();

    res.status(200).json(users);
}

module.exports = { getAllUsers };