const { Router } = require("express");
const userController = require("../controllers/user.controller");

const userRouter = Router();

// list of endpoint 

// Register a new User Endpoint
userRouter.post("/register", userController.registerUser);

//UserLogin Endpoint
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;