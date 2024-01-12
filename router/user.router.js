const { Router } = require("express");
const userController = require("../controllers/user.controller");

const userRouter = Router();

// list of endpoint 

userRouter.get("/users", userController.getAllUsers);

module.exports = userRouter;