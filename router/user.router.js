const { Router } = require("express");
const userController = require("../controllers/user.controller");

const userRouter = Router();

// list of endpoint 

// Get all Users for testing purposes (GET /users)
userRouter.get("/users", userController.getAllUsers);

// Register a new User Endpoint
userRouter.post("/register", userController.registerUser);

//UserLogin Endpoint
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;