// Defines endpoints and links them to controllers.

import express from 'express';
import { calculateCarValue } from '../controllers/api1Controller';

const router = express.Router();

router.post('/car-value', calculateCarValue);

export default router;
