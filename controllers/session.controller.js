const { User, Sport, Session } = require('../models');


async function getAllSessions(req, res) {
    const id = parseInt(req.params.id);

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
}

async function addSession(req, res) {
    // const id = parseInt(req.params.id);
    const { user_id, sport_id, date, description, score } = req.body;

    const session = await Session.create({
        date,
        description,
        score,
        sport_id,
        user_id
    });

    res.status(201).json(session);
}

async function updateSession(req, res) {
    const sessionId = parseInt(req.params.sessionId);
    const { date, description, score, sport_id, user_id } = req.body;

    const session = await Session.findByPk(sessionId);

    if (!session) {
        return res.status(404).json({ error: "Session not found" });
    }

    const updatedSession = await session.update({
        date: date || session.date,
        description: description || session.description,
        score: score || session.score,
        sport_id: sport_id || session.sport_id,
        user_id: user_id || session.user_id
    });

    res.status(200).json(updatedSession);
}

async function updateScore(req, res) {
    const sessionId = parseInt(req.params.sessionId);
    const { score } = req.body;

    const session = await Session.findByPk(sessionId);

    if (!session) {
        return res.status(404).json({ error: "Session not found" });
    }

    const updatedSession = await session.update({
        score: score || session.score
    });

    res.status(200).json(updatedSession);
}

async function deleteSession(req, res) {
    const sessionId = parseInt(req.params.sessionId);

    const session = await Session.findByPk(sessionId);

    if (!session) {
        return res.status(404).json({ error: "Session not found" });
    }

    await session.destroy();

    res.status(204).end();

}

module.exports = {
    getAllSessions,
    addSession,
    updateSession,
    updateScore,
    deleteSession
};