const { User, Sport } = require('../models');


async function getAllSessions(req, res) {
    const id = parseInt(req.params.id);

    const sessions = await User.findByPk(id, {
        include: [
            {
                association: 'sessions',
                include: [{ 
                    model: Sport, 
                    as: 'sport', // Assurez-vous que cette association est correctement définie dans votre modèle
                    attributes: ['name'] // Ici, 'name' est le champ que vous souhaitez récupérer de la table sport
                }]
            },
            {
                association: 'sports',
                include: ['category']
            }
        ]
    });

    if (!sessions) {
        return res.status(404).json({ error: "Sessions not found for User !" });
    }
    res.status(200).json(sessions);
}

module.exports = {
    getAllSessions,
};