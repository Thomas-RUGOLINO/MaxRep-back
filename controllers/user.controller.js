const { User } = require("../models");

async function getAllUsers(req, res) {
    const users = await User.findAll({
        include:['sessions',
            'best_performance',
            {association : 'sports', include : ['category']}
    
        ]

    });

    res.status(200).json(users);
}

async function registerUser (req, res) {
    try{
        const {email, password, passwordConfirm, lastname, firstname, birthDate, gender} = req.body;
    }
    catch (err){
        console.log("Erreur dans le processus d'enregistrement");
    }
}

module.exports = {
    getAllUsers,
    registerUser    
};