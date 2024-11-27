import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import api1App from '../api/api1/app';
import api2App from '../api/api2/api2';
import api3App from '../api/api3/app';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount API1
app.use('/api/v1', api1App);

// Mount API2 (rewrite the path to match API2's expectations)
app.use('/api/v2', (req: Request, res: Response, next: NextFunction) => {
    // Rewrite the path to match API2's expectations
    req.url = req.url.replace('/risk-rating', '/api2/risk-rating');
    api2App(req, res, next);
});

// Mount API3
app.use('/api/v3', api3App);

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

export default app; 

