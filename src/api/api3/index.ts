const express = require("express");
import { router } from "./routes/api3Routes";

const app = express();

app.use(express.json());

app.use("/api3", router)

export default app