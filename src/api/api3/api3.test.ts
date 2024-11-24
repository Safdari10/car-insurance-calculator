const express = require("express");
import { router } from "./routes/api3Routes";
import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import app from "../api3/index";

const api = express();

api.use(express.json());

api.use("/", router);

describe("Success cases for /quote API (include edge cases)", () => {
  const successCases = [
    {
      input: { car_value: 5000, risk_rating: 1 },
      expectedOutput: { monthly_premium: 4.17, yearly_premium: 50 },
    },
    {
      input: { car_value: 100000000, risk_rating: 5 },
      expectedOutput: { monthly_premium: 416666.67, yearly_premium: 50000 },
    },
    {
      input: { car_value: 0, risk_rating: 1 },
      expectedOutput: { monthly_premium: 0, yearly_premium: 0 },
    },
  ];

  test.each(successCases)(
    "should return correct premiums for input values",
    async (input, expectedOutput) => {
      const response = await request(app).post("/quote").send(input);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedOutput);
    }
  );
});

describe("Error cases for /quote API", () => {
  const errorCases = [
    {
      input: { car_value: 6614, risk_rating: 6 },
      expectedError: "Risk Rating is invalid",
    },
    {
      input: { car_value: 6614, risk_rating: 0 },
      expectedError: "Risk Rating is invalid",
    },
    {
      input: { car_value: 6614 },
      expectedError: "Risk Rating is required",
    },
    {
      input: { risk_rating: 3 },
      expectedError: "Car value is required",
    },
    {
      input: {},
      expectedError: "Car value and Risk Rating are required",
    },
    {
      input: { car_value: "Abc", risk_rating: 3 },
      expectedError: "Invalid Input",
    },
    {
      input: { car_value: -5000, risk_rating: 3 },
      expectedError: "Invalid Input",
    },
  ];

  test.each(errorCases)(
    "should return 400 for invalid input",
    async ({ input, expectedError }) => {
      const response = await request(app).post("/quote").send(input);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: expectedError });
    }
  );
});
