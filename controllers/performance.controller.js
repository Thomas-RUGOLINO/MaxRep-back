const { User, Session } = require('../models');

async function getPerformances(req, res) {
    const id = parseInt(req.params.id);
    console.log(id);

    const performances = await User.findByPk(id, {
        include: [
            {
                association: 'sports',
                include: [{ 
                    model: Session, 
                    as: 'sessions', // Assurez-vous que cette association est correctement définie dans votre modèle
                    where: { user_id: id },
                }]
            }
        ]
    });

    if (!performances) {
        return res.status(404).json({ error: "Performances not found for User !" });
    }

    res.status(200).json(performances);

}

module.exports = {
    getPerformances
};