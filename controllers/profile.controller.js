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
    const id  = parseInt(req.params.id);
    const { email, lastname, firstname, birthDate, gender, city, country, weight, height, isShared, profilePicture} = req.body;

    // check lastname and firstname if they don't have a number in the field 
    if (/\d/.test(firstname) || /\d/.test(lastname)) {
        return res.status(400).json({ error: "Firstname and lastname must contain only letters! / Les noms et prénoms ne doivent contenir que des lettres" });
    }
    // check weight and height if they don't have a text in the field
    if (/^\d+$/.test(weight) || /^\d+$/.test(height));
    
    // Récupérer la liste pour l'update
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({ error: "Requested user not found" });
    }
   
    const updatedUser = await user.update({
        email: email || user.email,
        firstname: firstname || user.firstname,
        lastname: lastname || user.lastname,
        birth_date: birthDate || user.birth_date,
        gender: gender || user.gender,
        city: city || user.city,
        country: country || user.country,
        weight: weight || user.weight,
        height: height || user.height,
        is_shared: isShared || user.is_shared,
        profile_picture: profilePicture || user.profile_picture,
    });
    // Répondre au client
    res.status(200).json(updatedUser);
}

async function addSportToUser(req, res) {
    
    const id = parseInt(req.params.id);
    const sport = parseInt(req.body.sportId);
    try {
        const user = await User.findByPk(id);
    
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
    
        // Utilisez la méthode addSport pour ajouter un sport à l'utilisateur
        await user.addSport(sport);
    
        res.status(201).json({message : "Sport ajouté à la pratique de l'utilisateur"});
    } 
    catch (error) {
        res.status(404).json({error: error});
    }
  
    
}



module.exports = {
    getProfile,
    updateProfile,
    addSportToUser
};