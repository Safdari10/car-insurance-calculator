import app from "./app"

const PORT = 3003

app.listen(PORT, () => {
    console.log(`API3 Server running on http://localhost:${PORT}`)
    console.log('API3 Available routes:')
    app._router.stack.forEach((r: any) => {
        if (r.route && r.route.path) {
            console.log(`${Object.keys(r.route.methods)} ${r.route.path}`)
        }
    })
})