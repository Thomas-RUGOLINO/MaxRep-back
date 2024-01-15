const { Router } = require("express");
const profileController = require("../controllers/profile.controller");

const profileRouter = Router();

// # List of Profile Endpoints

// Get user's infos by user ID
profileRouter.get("/profile/:id", profileController.getProfile);

/* // Update user's infos by ID
profileRouter.patch("/profile/:id", profileController.updateProfile);

// Delete user by ID
profileRouter.delete("/profile/:id", profileController.deleteProfile); */

module.exports = profileRouter;