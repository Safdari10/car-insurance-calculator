import { Router } from 'express';
import { getRiskRating } from '../Controllers/api2Controller';

const router = Router();

router.post('/risk-rating', getRiskRating);

export default router;
