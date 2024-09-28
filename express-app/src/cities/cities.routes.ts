import { Router } from "express";
import * as CitiesController from "./cities.controller";
import { authMiddleware } from "../middleware/valid.jwt";

const router = Router();

router
    .route("/city")
    .get(CitiesController.getCity); // Returns a single city based on Id or name
router
    .route("/citybygeo")
    .get(CitiesController.getCityByGeoloc); // Returns city based on lat and lon
router
    .route("/citySuggestions")
    .get(CitiesController.getSuggestions); // Returns city suggestions based on give search
router
    .route("/cityGeoJson")
    .get(CitiesController.getGeoJSON); // Returns GeoJSON data used for mapbox
router
    .route("/ratecity")
    .put(authMiddleware, CitiesController.rateCity); // Insert rating for a city

export default router;
