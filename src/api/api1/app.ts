// Combines routes, middleware, and configurations into an Express application

import express from "express";
import cors from "cors";
import { router } from "./routes/api1Routes";

const app = express();

// Add CORS middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
}));

// Debug middleware
app.use((req, res, next) => {
    console.log('API1 received request:', req.method, req.path);
    next();
});

app.use(express.json());

// Mount routes directly without additional prefix
app.use(router);

console.log('API1 Routes mounted');

export default app;
