const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require("../models");


async function registerUser (req, res) {
    // == 1. Data variables destructuration from the front Body REQUEST ==
    const {email, password, passwordConfirm, lastname, firstname, birthDate, gender} = req.body;

    // == 2. User's inputs CONTROL ==
    if(!email || !password || !passwordConfirm || !lastname || !firstname || !birthDate || !gender) {

        return res.status(400).json({ error: "Tous les champs sont obligatoires !" });  
    }
    // We verify if the email format is valid with the email-validator package
    if(!emailValidator.validate(email)){
        return res.status(400).json({ error: "Email invalide !" });
    }

    const existingUser = await User.findOne({ where: {email} });

    if (existingUser) {
        // if user already exists, return an error
        return res.status(400).json({ error: "L'Email existe déjà !" });
    }

    //We verify if the password and the passwordConfirm are the same
    if(passwordConfirm !== password){
        return res.status(400).json({ error:"Les mots de passe ne correspondent pas !" });
    }

    // We encrypt the password
    const salt = await bcrypt.genSalt(10); // salt add a unique value to the password to increase the encryption
    const hashPassword = await bcrypt.hash(req.body.password, salt); // hash the passord of the user, adding the salt

    // == 3. Register the USER in the DB ==

    try {
        const createdUser = await User.create({ 
            email,
            password: hashPassword,
            firstname,
            lastname,
            birth_date: birthDate,
            gender,
            profile_picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/768px-User-avatar.svg.png",
        });
        console.log(createdUser.firstname);
        // == 4. Réponse au client ==
        res.status(201).json({message : "Utilisateur crée avec succès"}); // We send a 201 status code to the client to confirm the creation of the user

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur du serveur, veuillez réessayer s'il vous plait" });
    }
    

}

async function loginUser(req, res) {
    // 1- == Body data Destructuration from Front's HTTP Request POST
    const  { email, password } = req.body;


    // 2 - == Email validation 
    if(!email || !password){
        return res.status(400).json({error : "Tous les champs sont obligatoires" });
    }

    if(!emailValidator.validate(email)){
        return res.status(400).json({ error: "Autenthification invalide vérifiez vos informations" });
    }

    // 3 - == We check if the email used is bound to a registered user in the DB
    try {
        const user = await User.findOne({ where: {email} });

        // If the user doesn"t exists we generate an error
        if(!user){
            return res.status(400).json({ error: "Autenthification invalide vérifiez vos informations" });

        } else {
            // If the user exists we compare the database hashed password to the password sent in the POST's body
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({ error: "Autenthification invalide vérifiez vos informations" });
            }
            // If the password sent is valid we generate the token and send it with the server's response in the header
            const token = jwt.sign({id : user.id, firstname : user.firstname, lastname : user.lastname}, process.env.SECRET);
            res.header('auth-token', token);
            return res.status(200).json(token);
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur du serveur, veuillez réessayer s'il vous plait" });
    }
    
}


module.exports = { 
    registerUser,
    loginUser    
};