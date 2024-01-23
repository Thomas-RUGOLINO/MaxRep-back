const {Op} = require('sequelize');
const { User, Sport, Best_performance } = require('../models');

async function getRanking(req, res) {

    const {sportId, gender, country, city, weightMin, weightMax} = req.query;

    if (!weightMin || !weightMax) {
        return res.status(404).json({ error: "You must specify a min weight and a max weight" });
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
                            }
                        ]
                    }
                },
                {
                    model: Sport,
                    as: 'sport',
                    attributes: ['id', 'name'],
                },
            ],
        });
    
        res.status(200).json(bestPerformances);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error / Please try again" });
    }
}

module.exports = {
    getRanking
};