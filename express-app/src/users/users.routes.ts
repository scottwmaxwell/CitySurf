import { Router } from "express";
import * as UsersController from "./users.controller";
import { authMiddleware } from "../middleware/valid.jwt";

const router = Router();

router
  .route("/savedCities")
  .get(authMiddleware, UsersController.getSavedCities);
router
  .route("/createUser")
  .post(UsersController.createUser);
router
  .route("/authenticateUser")
  .post(UsersController.authenticateUser);
router
  .route("/requestReset")
  .get(UsersController.requestReset);
router
  .route("/resetAuthorize")
  .get(UsersController.resetAuthorize);
router
  .route("/passwordReset")
  .put(authMiddleware, UsersController.passwordReset);
router
  .route("/deleteCity")
  .delete(authMiddleware, UsersController.deleteCity);
router
  .route("/saveCity")
  .put(authMiddleware, UsersController.saveCity);

export default router;
