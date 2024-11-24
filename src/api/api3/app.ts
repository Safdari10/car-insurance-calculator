import express from "express"
import { router } from "./routes/api3Routes";

const app = express();

app.use(express.json());

app.use("/", router)

const port = 3500

app.listen(port, () => {
    console.log(`Server Listening @ http://localhost:${port}`);
  });

export default app