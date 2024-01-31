const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    // We get the token from the header if present
    const authHeader = req.header("Authorization");

    // We verify if the token is present
    if (!authHeader) {
        return res.status(401).json({error : "Vous n'avez pas les droits d'accès à cette ressource"});
    }

    try {
        // We split the token to get only the token part
        const token = authHeader.split(' ')[1];

        // Token verification based on the secret key
        const verified = jwt.verify(token, process.env.SECRET);

        // We bind the user to the request
        req.user = verified;

        // we call the next middleware if everything is ok
        next();
    } catch (err) {
        res.status(401).json({ error: "Vous n'avez pas les droits d'accès à cette ressource" });
    }
};

module.exports = verify;