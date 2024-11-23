const express = require("express");
import { router } from "./routes/api3Routes";
import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import { response } from "express";
import app from "../api3/index";

const api = express();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());

api.use("/", router);

describe("Qoute Route", () => {
  test("API should return correct premiums for valid input", async () => {
    const input = { car_value: 6614.75, risk_rating: 5 };

    // Send the request to the API
    const response = await request(app)
      .post("/quote") // Use POST to send the input data
      .send(input);

    expect(response.status).toBe(200);

    expect(response.body.yearly_premium).toEqual(330.75);
    expect(response.body.monthly_premium).toEqual(27.76);
  });

  test("API should return an error when required fields are missing,", async () => {
    //missing car value
    expect(response.status).toBe(400);
  });
});
