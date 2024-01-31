const { Router } = require("express");
const profileController = require("../controllers/profile.controller");
//Importing the verify middleware to check the Token Validity
const verify = require("../middleware/verify");

const profileRouter = Router();

// # List of Profile Endpoints

// Get user's infos by user ID
profileRouter.get("/profile/:id", verify, profileController.getProfile);

// Update user's infos by ID
profileRouter.patch("/profile/:id", verify, profileController.updateProfile);

// Delete user by ID
profileRouter.delete("/profile/:id", verify, profileController.deleteUser); 

// Add Sport by user
profileRouter.post("/profile/sport/:id", verify, profileController.addSportToUser);

// Remove Sport by user
profileRouter.delete("/profile/sport/:id/:sportId", verify, profileController.deleteSportUser);

// get all categories including sports
profileRouter.get("/categories", verify, profileController.getCategories);



module.exports = profileRouter;
