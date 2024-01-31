// router/index.router
const { Router } = require("express");

const userRouter = require("./user.router");
const profileRouter = require("./profile.router");
const sessionRouter = require("./session.router");
const performanceRouter = require("./performance.router");
const rankingRouter = require("./ranking.router");

// principal router
const router = Router();


//Lists of routers Used by the principal router
router.use(userRouter);
router.use(profileRouter);
router.use(sessionRouter);
router.use(performanceRouter);
router.use(rankingRouter);

//Error 404 if the route doesn't exist
router.use((req, res) => {
    res.status(404).json({ error : "Ressource non trouvée !"});
});

module.exports = router;