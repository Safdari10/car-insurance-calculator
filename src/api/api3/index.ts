const express = require("express");
import { router } from "./routes/api3Routes";

const api = express();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());

api.use("/api3", router)

export default api