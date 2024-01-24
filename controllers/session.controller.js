const { User, Sport, Session, Best_performance } = require('../models');


async function getAllSessions(req, res) {
    const id = parseInt(req.params.id);

    try {
        const sessions = await User.findByPk(id, {
            attributes: [ 'id' ],
            include: [
                {
                    association: 'sessions',
                    include: [{ 
                        model: Sport, 
                        as: 'sport', // Assurez-vous que cette association est correctement définie dans votre modèle
                        attributes: ['name', 'unit'] // Ici, 'name' est le champ que vous souhaitez récupérer de la table sport
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

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error / Please try again" });
    }

    
}

async function addSession(req, res) {
    // const id = parseInt(req.params.id);
    const { user_id, sport_id, date, description } = req.body;

    try {
        const session = await Session.create({
            date,
            description,
            sport_id,
            user_id
        });
        
        // Renvoie la réponse formatée
        res.status(201).json(session);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error / Please try again" });
    }
}

async function updateSession(req, res) {
    const sessionId = parseInt(req.params.sessionId);
    const { date, description, score, sport_id, user_id, unit } = req.body;
    
    try {
        const session = await Session.findByPk(sessionId);

        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }

        const updatedSession = await session.update({
            date: date || session.date,
            description: description || session.description,
            score: score || session.score,
            sport_id: parseInt(sport_id)|| session.sport_id,
            user_id: user_id || session.user_id
        });

        if (unit === "kg") {
            const bestPerformance = await Best_performance.findOne({
                where: {
                    user_id: user_id,
                    sport_id: sport_id
                }
            });

            if (bestPerformance && score > bestPerformance.best_score) {
            // Mise à jour de la ligne dans la table best_performance
                await bestPerformance.update({
                    best_score: score,
                    date: date
                });
            }
        } else if (unit === "temps") {
            const bestPerformance = await Best_performance.findOne({
                where: {
                    user_id: user_id,
                    sport_id: sport_id
                }
            });
            
            if (bestPerformance && (score < bestPerformance.best_score || bestPerformance.best_score === 0)) {
            // Mise à jour de la ligne dans la table best_performance
                await bestPerformance.update({
                    best_score: score,
                    date: date
                });
            }
        }
    
        res.status(200).json(updatedSession);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error / Please try again" });
    }

    
}

async function deleteSession(req, res) {
    const sessionId = parseInt(req.params.sessionId);

    try {
        const session = await Session.findByPk(sessionId);

        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }
    
        await session.destroy();
    
        res.status(204).end();    

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error / Please try again" });
    }

}

module.exports = {
    getAllSessions,
    addSession,
    updateSession,
    deleteSession
};