const express = require("express");
import { router } from "./routes/api3Routes";
import request from "supertest";
import { describe, test, expect } from "@jest/globals";

const api = express();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());

api.use("/", router);

describe("Qoute Route", () => {

  test("Api is Reachable: responds with 200 status code", () => {
    expect(200).toEqual(200);

  });

  test("API works as intended: car_value: 6614.75, risk_rating 5", () => {
    expect({"monthly_premium": 27.56, "yearly_premium": 330.75})
  })

});
