import express from "express";
import { explorePopularRepos } from "../controller/explore.controller.js";
const exploreRoutes = express.Router();

exploreRoutes.get('/repos/:language', explorePopularRepos);
export default exploreRoutes;