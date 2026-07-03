import express from "express";
import {
	getUserProfileAndRepos,
	likeProfile,
	getLikes,
} from "../controller/user.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const userRoutes = express.Router();

userRoutes.get("/profile/:username", getUserProfileAndRepos);

userRoutes.get(
	"/likes",
	ensureAuthenticated,
	getLikes
);

userRoutes.post(
	"/like/:username",
	ensureAuthenticated,
	likeProfile
);

export default userRoutes;