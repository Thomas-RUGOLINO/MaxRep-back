const { User, Session, Sport } = require('../models');


//Get all performances for a user Endpoint controller
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
                        as: 'sessions', 
                        where: { user_id: id },
                        order: [['id', 'ASC']] 
                    }],
                    order: [[Sport, 'id', 'ASC']] 
                }
            ]
        });
    
        if (!performances) {
            return res.status(404).json({ error: "Aucune performance trouvée pour cet utilisateur" });
        }
        // We sort the sports by id and keep the original structure of the object
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

