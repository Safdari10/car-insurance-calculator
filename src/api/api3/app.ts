import express from "express"
import router from "./routes/api3Routes";

const app = express();

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log('API3 received request:', req.method, req.path);
    next();
});

app.use(express.json());

app.use(router)

// Debug endpoint to show available routes
app.get('/debug/routes', (req, res) => {
    const routes = app._router.stack
        .filter((r: any) => r.route)
        .map((r: any) => `${Object.keys(r.route.methods)} ${r.route.path}`);
    res.json({ routes });
});

export default app