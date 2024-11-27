// Combines routes, middleware, and configurations into an Express application

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import api1Routes from './routes/api1Routes'; 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`API1 received request: ${req.method} ${req.originalUrl}`);
    next();
});

// Mount routes without the /v1 prefix
app.use('/', api1Routes);

console.log('API1 Routes mounted');

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('API1 Error:', err);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
