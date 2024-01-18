const { Router } = require("express");
const sessionController = require("../controllers/session.controller");
const verify = require("../middleware/verify");

const sessionRouter = Router();



sessionRouter.get("/sessions/:id", verify, sessionController.getAllSessions);

module.exports = sessionRouter;