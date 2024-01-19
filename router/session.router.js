const { Router } = require("express");
const sessionController = require("../controllers/session.controller");
const verify = require("../middleware/verify");

const sessionRouter = Router();


sessionRouter.post("/sessions", verify, sessionController.addSession);

sessionRouter.patch("/sessions/:sessionId", verify, sessionController.updateSession);

sessionRouter.get("/sessions/:id", verify, sessionController.getAllSessions);

sessionRouter.delete("/sessions/:sessionId", verify, sessionController.deleteSession);



module.exports = sessionRouter;