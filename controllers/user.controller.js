const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
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
    // == 1. Data variables destructuration from the front Body REQUEST ==
    const {email, password, passwordConfirm, lastname, firstname, birthDate, gender} = req.body;

    // == 2. User's inputs CONTROL ==
    if(!email || !password || !passwordConfirm || !lastname || !firstname || !birthDate || !gender) {

        return res.status(400).json({ error: "All fields are mandatory / Tous les champs sont obligatoires !" });  
    }

    if(!emailValidator.validate(email)){
        return res.status(400).json({ error: "Invalid email / Email invalide !" });
    }

    const existingUser = await User.findOne({ where: {email} });

    if (existingUser) {
        // if user already exists, return an error
        return res.status(400).json({ error: "Email already exists / L'email existe déjà !" });
    }

    if(passwordConfirm !== password){
        return res.status(400).json({ error:"Les mots de passe ne correspondent pas / Passwords do not match !" });
    }

    
    // encrypt the password
    const salt = await bcrypt.genSalt(10); // salt add a unique value to the password to increase the encryption
    const hashPassword = await bcrypt.hash(req.body.password, salt); // hash the passord of the user, adding the salt


    // == 3. Register the USER in the DB ==

    
    const createdUser = await User.create({ // On créé la liste en BDD via nos models
        email,
        password: hashPassword,
        firstname,
        lastname,
        birth_date: birthDate,
        gender,
    });

    // == 4. Réponse au client ==
    res.status(201).json(createdUser); // On repond au client via un res.json

}
module.exports = {
    getAllUsers,
    registerUser    
};