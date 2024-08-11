import { Router } from 'express';
import * as UsersController from './users.controller';
import { authMiddleware } from '../middleware/valid.jwt';

const router = Router();

router
    .route('/savedCities')
    .get(authMiddleware, UsersController.getSavedCities);
router
    .route('/createUser')
    .post(UsersController.createUser);
router
    .route('/updateUser')
    .post(authMiddleware, UsersController.updateUser);
router
    .route('/authenticateUser')
    .post(UsersController.authenticateUser)
router
    .route('/user/:id')
    .delete(authMiddleware, UsersController.deleteUser);
router
    .route('/savedCities/:id')
    .delete(authMiddleware, UsersController.deleteCity);

export default router;