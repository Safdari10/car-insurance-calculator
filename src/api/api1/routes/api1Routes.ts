// Defines endpoints and links them to controllers.

import express from 'express';
import { calculateCarValue } from '../controllers/api1Controller';

const router = express.Router();

console.log('Setting up API1 routes - /car-value endpoint');

router.post('/car-value', (req, res) => {
    console.log('Received car-value request:', req.body);
    calculateCarValue(req, res);
});

export { router };
