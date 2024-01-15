const { User } = require("../models");

async function getProfile(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id, {
        include:['sessions',
            {association : 'sports', include : ['category']}
        ]

    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
}

async function updateProfile(req, res) {
    const { id } = req.params;

    
}

module.exports = {
    getProfile,
    updateProfile
};