import express from "express";
import { getUserProfileAndRepos } from "../controller/user.controller.js";
const userRoutes = express.Router();
userRoutes.get('/profile/:username', getUserProfileAndRepos);
export default userRoutes;