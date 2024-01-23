const { Router } = require("express");
const rankingController = require("../controllers/ranking.controller");
const verify = require("../middleware/verify");

const rankingRouter = Router();

rankingRouter.get("/ranking", verify, rankingController.getRanking);

module.exports = rankingRouter;