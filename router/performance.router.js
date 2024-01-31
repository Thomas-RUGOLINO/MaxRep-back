const { Router } = require("express");
const performanceController = require("../controllers/performance.controller");
//Importing the verify middleware to check the Token Validity
const verify = require("../middleware/verify");

const performanceRouter = Router();
//Getting all Performances Endpoint by User ID
performanceRouter.get("/performances/:id", verify, performanceController.getPerformances);

module.exports = performanceRouter;