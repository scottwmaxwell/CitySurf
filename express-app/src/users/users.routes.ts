import { Router } from "express";
import * as UsersController from "./users.controller";
import { authMiddleware } from "../middleware/valid.jwt";

const router = Router();

router
  .route("/savedCities")
  .get(authMiddleware, UsersController.getSavedCities); // returns saved cities for user
router
  .route("/createUser")
  .post(UsersController.createUser); // creates a user in Database
router
  .route("/authenticateUser")
  .post(UsersController.authenticateUser); // authenticates user and returns session token
router
  .route("/requestReset")
  .get(UsersController.requestReset); // request to reset password sends email if user exists
router
  .route("/resetAuthorize")
  .get(UsersController.resetAuthorize); // authorizes code sent to user and sends a temporary auth token
router
  .route("/passwordReset")
  .put(authMiddleware, UsersController.passwordReset); // resets password for user
router
  .route("/deleteCity")
  .delete(authMiddleware, UsersController.deleteCity); // removes a city for a user
router
  .route("/saveCity")
  .put(authMiddleware, UsersController.saveCity); // saves a city for a user

export default router;
