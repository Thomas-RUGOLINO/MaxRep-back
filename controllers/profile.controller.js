const { User, Category, Sport, Best_performance } = require("../models");


// Get User Profile data Endpoint Function by User ID

async function getProfile(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id, {
            include:['sessions',
                {association : 'sports', include : ['category']}
            ]
    
        });
    
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur du serveur, veuillez réessayer s'il vous plait" });
    }

    
}

// Update User Profile Data Endpoint by User ID

async function updateProfile(req, res) {
    const id  = parseInt(req.params.id);
    const { email, lastname, firstname, birth_date, gender, city, country, weight, height, is_shared, profile_picture} = req.body;
    const numweight = parseInt(weight);
    const numheight = parseInt(height);

    // check lastname and firstname if they don't have a number in the field 
    if (/\d/.test(firstname) || /\d/.test(lastname)) {
        return res.status(400).json({ error: " Les noms et prénoms ne doivent contenir que des lettres" });
    }
    // check weight and height if they don't have a text in the field
    if (numweight && isNaN(numweight) || numheight && isNaN(numheight)) {
        return res.status(400).json({ error: "La taille et le poids doivent être des chiffres !" });
    }
    
    // Récupérer le User pour l'update
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "Utilisateur spécifié introuvable" });
        }
   
        const updatedUser = await user.update({
            email: email || user.email,
            firstname: firstname || user.firstname,
            lastname: lastname || user.lastname,
            birth_date: birth_date || user.birth_date,
            gender: gender || user.gender,
            city: city || user.city,
            country: country || user.country,
            weight: numweight || user.weight,
            height: numheight || user.height,
            is_shared: Object.prototype.hasOwnProperty.call(req.body, 'is_shared') ? is_shared : user.is_shared,
            profile_picture: profile_picture || user.profile_picture,
        });
        // Répondre au client
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur du serveur, veuillez réessayer s'il vous plait" });
    }
    
}

// Delete a User Endpoint by User ID

async function deleteUser(req, res) {
    
    const userId = parseInt(req.params.id);

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé" });
        }

        await user.destroy();

        res.status(204).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur du serveur, veuillez réessayer s'il vous plait" });
    }
    
    
}

// Link Between a User and a Sport EndPoint in profile Page By adding the corresponding row is user_has_sport table

async function addSportToUser(req, res) {
    
    const id = parseInt(req.params.id);
    const sport = parseInt(req.body.sportId);
    // On récupère la date du jour au format ISO pour l'insérer au format YYYY-MM-DD dans best_performance lorsque l'utilisateur ajoute un sport
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    try {
        const user = await User.findByPk(id);
    
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
    
        // Utilisez la méthode addSport pour ajouter un sport à l'utilisateur
        await user.addSport(sport);
        // Au moment où l'on crée un lien utilisateur <=> sport, on crée la ligne dans la table best_performance qui correspond à ce sport et cet utilisateur
        const existingBestPerformance = await Best_performance.findOne({
            where: {
                user_id: id,
                sport_id: sport,
            },
        });

        if (existingBestPerformance) {
            return res.status(401).json({ error: "Vous suivez déjà ce sport." });
        }

        await Best_performance.create({
            user_id: id,
            sport_id: sport,
            best_score: 0,
            date: formattedDate,
        });

        res.status(201).json({message : "Sport ajouté à l'utilisateur"});
    } 

    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur du serveur, veuillez réessayer s'il vous plait" });
    }
  
}

// Delete the link between a User and a Sport based on the Couple UserID, SportID in user_has_sport table

async function deleteSportUser (req, res) {

    const id = parseInt(req.params.id);
    const sport = parseInt(req.params.sportId);

    try {
        const user = await User.findByPk(id);
    
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
    
        // Utilisez la méthode removeSport pour supprimer un sport à un utilisateur
        await user.removeSport(sport);

        res.status(204).end();
    } 

    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur du serveur, veuillez réessayer s'il vous plait" });
    }


}

async function getCategories(req, res) {

    try {
        const categories = await Category.findAll({
            include: [{
                model: Sport,
                as: 'sports',
            }],
        });
    
        res.status(200).json(categories);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur du serveur, veuillez réessayer s'il vous plait" });
    }
    
}



module.exports = {
    getProfile,
    updateProfile,
    addSportToUser,
    deleteUser,
    deleteSportUser,
    getCategories
};