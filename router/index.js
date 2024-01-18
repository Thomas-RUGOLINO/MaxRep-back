// router/index.router
const { Router } = require("express");

const userRouter = require("./user.router");
const profileRouter = require("./profile.router");
const sessionRouter = require("./session.router");

// principal router
const router = Router();

router.use(userRouter);
router.use(profileRouter);
router.use(sessionRouter);

router.use((req, res) => {
    res.status(404).json({ error : "Not found"});
});

module.exports = router;