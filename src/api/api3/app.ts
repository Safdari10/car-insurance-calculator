import express from "express"
import { router } from "./routes/api3Routes";

const app = express();

app.use(express.json());

app.use("/", router)


export default app