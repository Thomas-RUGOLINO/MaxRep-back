const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

        return res.status(400).json({ error: "All fields are required / Tous les champs sont obligatoires !" });  
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

async function loginUser(req, res) {
    // 1- == Body data Destructuration from Front's HTTP Request POST
    const  { email, password } = req.body;


    // 2 - == Email validation 
    if(!email || !password){
        return res.status(400).json({error : "All fields are required / Tous les champs sont obligatoires" });
    }

    if(!emailValidator.validate(email)){
        return res.status(400).json({ error: "Invalid Authentication check your credentials ! / Autenthification invalide vérifiez vos informations" });
    }

    // 3 - == We check if the email used is bound to a registered user in the DB
    const user = await User.findOne({ where: {email} });

    // If the user doesn"t exists we generate an error
    if(!user){
        // ! Attention : lorsque l'on doit renvoyer à l'utilisateur une erreur, spécifiant que soit son email soit son mot de passe est invalide, le message le plus flou possible. C'est à dire que l'on ne renverra pas "email invalide" ou "mot de passe incorrect", mais "authentification invalide". Le but étant de laissé le moins de pistes possible pour un potentiel pirate.
        return res.status(400).json({ error: "Invalid Authentication check your credentials ! / Autenthification invalide vérifiez vos informations" });
    } else {
        // If the user exists we compare the database hashed password to the password sent in the POST's body
        // comparer user.password (le mot de passe récupérer de la BDD) avec password (fourni par l'utilisateur dans le post)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ error: "Invalid Authentication check your credentials ! / Autenthification invalide vérifiez vos informations" });
        }
        // If the password sent is valid we generate the token and send it with the server's response in the header
        const token = jwt.sign({id : user.id, firstname : user.fistname, lastname : user.lastname}, process.env.SECRET);
        res.header('auth-token', token);
        return res.status(200).json(token);
    }
}


module.exports = { 
    getAllUsers,
    registerUser,
    loginUser    
};