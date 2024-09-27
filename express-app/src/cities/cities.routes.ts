import { Router } from "express";
import * as CitiesController from "./cities.controller";
import { authMiddleware } from "../middleware/valid.jwt";

const router = Router();

router.route("/city").get(CitiesController.getCity);
router.route("/citybygeo").get(CitiesController.getCityByGeoloc);
router.route("/citySuggestions").get(CitiesController.getSuggestions);
router.route("/cityGeoJson").get(CitiesController.getGeoJSON);
router.route("/ratecity").put(authMiddleware, CitiesController.rateCity);

export default router;
