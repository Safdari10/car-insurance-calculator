import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import api1App from '../api/api1/app';
import api3Routes from '../api/api3/routes/api3Routes';

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

// Mount APIs
app.use('/api/v1', api1App);
app.use('/api/v3', api3Routes);

// Add a test endpoint
app.get('/test', (req: Request, res: Response) => {
    res.json({
        message: 'Gateway is working',
        mountedRoutes: {
            api1: '/api/v1',
            api3: '/api/v3'
        }
    });
});

// Debug endpoint with proper typing
app.get('/debug/routes', (req: Request, res: Response) => {
    const routes: string[] = [];
    app._router.stack.forEach((middleware: any) => {
        if (middleware.route) {
            routes.push(`${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler: any) => {
                if (handler.route) {
                    const path = handler.route.path;
                    const methods = Object.keys(handler.route.methods);
                    routes.push(`${methods} ${middleware.regexp} ${path}`);
                }
            });
        }
    });
    res.json({ routes });
});

// 404 handler with more detailed information
app.use('*', (req: Request, res: Response) => {
    console.log('404 - Route not found:', req.method, req.originalUrl);
    res.status(404).json({ 
        error: `Route ${req.originalUrl} not found`,
        method: req.method,
        requestedPath: req.originalUrl,
        availableRoutes: app._router.stack
            .filter((r: any) => r.route)
            .map((r: any) => `${Object.keys(r.route.methods)} ${r.route.path}`)
    });
});

export default app; 

