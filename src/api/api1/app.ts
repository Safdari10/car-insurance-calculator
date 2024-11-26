// Combines routes, middleware, and configurations into an Express application

import express, { NextFunction, Request, Response } from 'express';
import api1Routes from './routes/api1Routes.js'; 

const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use('/api/v1', api1Routes);

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

export default app;
