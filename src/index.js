import app from "./api/api3/index"

const port = 3500

app.listen(port, () => {
    console.log(`Server Listening @ http://localhost:${port}`);
  });