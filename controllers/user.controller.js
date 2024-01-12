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

    if(passwordConfirm !== password){
        return res.status(400).json({ error:"Les mots de passe ne correspondent pas / Passwords do not match !" });
    }

    function convertDateToDBFormat(dateString) {
        // Séparation des composants de la date
        const parts = dateString.split('/');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
    
        // Recomposition dans le format YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;
    
        // Conversion en objet Date
        const dateObject = new Date(formattedDate);
    
        // Formatage pour la base de données
        return dateObject.toISOString().split('T')[0];
    }

    //const inputDate = "01/01/2024";
    const dbFormattedDate = convertDateToDBFormat(birthDate);
    //console.log(dbFormattedDate); // Affiche "2024-01-01"
    
    // encrypt the password
    const salt = await bcrypt.genSalt(10); // salt add a unique value to the password to increase the encryption
    const hashPassword = await bcrypt.hash(req.body.password, salt); // hash the passord of the user, adding the salt


    // == 3. Register the USER in the DB ==

    
    const createdUser = await User.create({ // On créé la liste en BDD via nos models
        email,
        password: hashPassword,
        firstname,
        lastname,
        birth_date: dbFormattedDate,
        gender,
    });

    // == 4. Réponse au client ==
    res.status(201).json(createdUser); // On repond au client via un res.json

}
module.exports = {
    getAllUsers,
    registerUser    
};