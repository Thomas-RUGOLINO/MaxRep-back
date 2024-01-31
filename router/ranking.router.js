const { Router } = require("express");
const rankingController = require("../controllers/ranking.controller");
//Importing the verify middleware to check the Token Validity
const verify = require("../middleware/verify");

const rankingRouter = Router();
//Getting the Ranking Endpoint
rankingRouter.get("/ranking", verify, rankingController.getRanking);

module.exports = rankingRouter;