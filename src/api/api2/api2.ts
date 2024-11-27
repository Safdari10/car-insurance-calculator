import express from 'express';
import riskRatingRoutes from './routes/api2Routes';

const app = express();
app.use(express.json()); 

app.use('/api2', riskRatingRoutes);

export default app;
