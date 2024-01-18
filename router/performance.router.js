const { Router } = require("express");
const performanceController = require("../controllers/performance.controller");
const verify = require("../middleware/verify");

const performanceRouter = Router();

performanceRouter.get("/performances/:id", verify, performanceController.getPerformances);

module.exports = performanceRouter;