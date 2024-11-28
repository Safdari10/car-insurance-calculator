import express from 'express';
import { index, quote } from '../controllers/api3Controller';

const router = express.Router();

console.log('Setting up API3 routes - /quote endpoint');

// Debug endpoint
router.get('/test', (req, res) => {
    res.json({ 
        message: 'API3 routes are working',
        availableRoutes: router.stack
            .filter((r: any) => r.route)
            .map((r: any) => `${Object.keys(r.route.methods)} ${r.route.path}`)
    });
});

// Quote endpoint
router.post('/quote', (req, res) => {
    console.log('Received quote request:', req.body);
    quote(req, res);
});

// Log routes on creation
console.log('API3 Routes configured:', 
    router.stack
        .filter((r: any) => r.route)
        .map((r: any) => `${Object.keys(r.route.methods)} ${r.route.path}`)
);

export default router;
