import { Router } from 'express';
import * as CitiesController from './cities.controller';
// import { authMiddleware } from '../middleware/valid.jwt';

const router = Router();

router
    .route('/city')
    .get(CitiesController.getCity);

export default router;