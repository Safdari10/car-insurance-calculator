const express = require("express");
import { router } from "./routes/api3Routes";
import request from "supertest"
import { describe, test, expect } from "@jest/globals"

const api = express();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());

api.use("/", router);
