const { Router } = require("express");
const sessionController = require("../controllers/session.controller");
//Importing the verify middleware to check the Token Validity
const verify = require("../middleware/verify");

const sessionRouter = Router();

//Adding a Session Endpoint
sessionRouter.post("/sessions", verify, sessionController.addSession);
//Updating a Session Endpoint by Session ID
sessionRouter.patch("/sessions/:sessionId", verify, sessionController.updateSession);
//Getting all Sessions Endpoint by User ID 
sessionRouter.get("/sessions/:id", verify, sessionController.getAllSessions);
//Deleting a Session Endpoint by Session ID
sessionRouter.delete("/sessions/:sessionId", verify, sessionController.deleteSession);



module.exports = sessionRouter;