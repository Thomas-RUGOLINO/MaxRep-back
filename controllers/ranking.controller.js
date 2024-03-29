const {Op} = require('sequelize');
const { User, Sport, Best_performance } = require('../models');


// Get ranking Endpoint controller
async function getRanking(req, res) {

    const {sportId, gender, country, city, weightMin, weightMax} = req.query;

    if ((weightMin && !weightMax )|| (!weightMin && weightMax)) {
        return res.status(404).json({ error: "Vous devez spécifier un poids minimum et un poids maximum" });
    }

    try {
        const bestPerformances = await Best_performance.findAll({
            where: {
                [Op.and]:[
                    {sport_id: sportId},
                ]
            },
            include: [
                {
                    // We include the user model to get the user data and we add filters to the query, if the user has chosen to share his data
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstname', 'lastname', 'gender', 'country', 'city', 'weight'],
                    where: {
                        [Op.and]:[
                            gender && {gender: gender},
                            country && {country: country},
                            city && {city: city},
                            weightMin && weightMax && {
                                weight: {
                                    [Op.between] : [weightMin , weightMax]
                                }
                            },
                            { is_shared: true }
                        ]
                    }
                },
                {
                    model: Sport,
                    as: 'sport',
                    attributes: ['id', 'name', 'unit'],
                },
            ],
        });
    
        res.status(200).json(bestPerformances);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur du serveur, veuillez réessayer s'il vous plait" });
    }
}

module.exports = {
    getRanking
};