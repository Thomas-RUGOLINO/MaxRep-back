const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    // Récupère la valeur de l'en-tête 'Authorization'
    const authHeader = req.header("Authorization");

    // Vérifie si l'en-tête 'Authorization' est présent
    if (!authHeader) {
        return res.status(401).json({error : "Unauthorized Access / Vous n'avez pas les droits d'accès à cette ressource"});
    }

    try {
        // Sépare la chaîne 'Bearer YOUR_TOKEN' pour obtenir le token
        const token = authHeader.split(' ')[1];

        // Vérifie le token
        const verified = jwt.verify(token, process.env.SECRET);

        // Attache les informations utilisateur à l'objet de la requête
        req.user = verified;

        // Appelle le middleware suivant
        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized Access / Vous n'avez pas les droits d'accès à cette ressource" });
    }
};

module.exports = verify;