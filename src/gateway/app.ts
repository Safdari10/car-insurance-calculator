import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import api1App from '../api/api1/app';

const app = express();

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Gateway received: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Mount API1 with the complete prefix
app.use('/api/v1', api1App);

// Debug endpoint
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', routes: app._router.stack
        .filter((r: any) => r.route)
        .map((r: any) => `${Object.keys(r.route.methods)} ${r.route.path}`)
    });
});

// Debug middleware to log all registered routes
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Available routes:', app._router.stack
        .filter((r: any) => r.route)
        .map((r: any) => `${Object.keys(r.route.methods)} ${r.route.path}`));
    next();
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
    console.log('404 - Route not found:', req.originalUrl);
    res.status(404).json({ 
        error: `Route ${req.originalUrl} not found`,
        availableRoutes: app._router.stack
            .filter((r: any) => r.route)
            .map((r: any) => `${Object.keys(r.route.methods)} ${r.route.path}`)
    });
});

export default app; 

