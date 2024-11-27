import app from './app';

const PORT = 4000; // Different port from the individual APIs

app.listen(PORT, () => {
    console.log(`Gateway server running on http://localhost:${PORT}`);
}); 

