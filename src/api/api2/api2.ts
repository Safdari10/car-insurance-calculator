import express from 'express';
import riskRatingRoutes from './routes/api2Routes';

const app = express();
app.use(express.json()); 

app.use('/api2', riskRatingRoutes);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
