const { User, Session, Sport } = require('../models');

async function getPerformances(req, res) {
    const id = parseInt(req.params.id);
    
    try {
        const performances = await User.findByPk(id, {
            attributes: ['id'],
            include: [
                {
                    association: 'sports',
                    include: [{ 
                        model: Session, 
                        as: 'sessions', // Assurez-vous que cette association est correctement définie dans votre modèle
                        where: { user_id: id },
                        order: [['id', 'ASC']] // Tri par l'id du sport en ordre croissant
                    }],
                    order: [[Sport, 'id', 'ASC']] // Tri par l'id du sport en ordre croissant
                }
            ]
        });
    
        if (!performances) {
            return res.status(404).json({ error: "Aucune performance trouvée pour cet utilisateur" });
        }
        // Triez les sports tout en conservant la structure d'origine
        const sortedSports = performances.sports.sort((a, b) => a.id - b.id);
        const sortedUser = {
            id: performances.id,
            sports: sortedSports
        };

        res.status(200).json(sortedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur du serveur, veuillez réessayer s'il vous plaît" });
    }
}

module.exports = {
    getPerformances
};

