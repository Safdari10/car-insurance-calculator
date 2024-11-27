import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

// Add a test route directly in the server file
app.get('/test', (req, res) => {
  res.json({ message: 'Gateway is running' });
});

app.listen(PORT, () => {
    console.log(`Gateway server running on http://localhost:${PORT}`);
    console.log('Available routes:');
    app._router.stack.forEach((r: any) => {
        if (r.route && r.route.path) {
            console.log(`${Object.keys(r.route.methods)} ${r.route.path}`);
        }
    });
}); 

