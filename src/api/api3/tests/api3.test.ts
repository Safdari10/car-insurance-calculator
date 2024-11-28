import request from "supertest";
import app from "../app";

describe("Testing POST API /quote", () => {
  const testCases = [
    {
      input: { car_value: 5000, risk_rating: 1 },
      expectedOutput: { monthly_premium: 4.17, yearly_premium: 50 },
      expectedStatus: 200,
    },
    {
      input: { car_value: 100000000, risk_rating: 5 },
      expectedOutput: { monthly_premium: 416666.67, yearly_premium: 5000000 },
      expectedStatus: 200,
    },
    {
      input: { car_value: "5,000", risk_rating: 1 },
      expectedOutput: { monthly_premium: 4.17, yearly_premium: 50 },
      expectedStatus: 200,
    },
    {
      input: { car_value: 6614, risk_rating: 6 },
      expectedOutput: { error: "Risk Rating must be a number between 1 and 5" },
      expectedStatus: 400,
    },
    {
      input: { car_value: 6614, risk_rating: -1 },
      expectedOutput: { error: "Risk Rating must be a number between 1 and 5" },
      expectedStatus: 400,
    },
    {
      input: { car_value: 6614 },
      expectedOutput: { error: "Car Value and Risk Rating are required" },
      expectedStatus: 400,
    },
    {
      input: { risk_rating: 3 },
      expectedOutput: { error: "Car Value and Risk Rating are required" },
      expectedStatus: 400,
    },
    {
      input: { car_value: "Abc", risk_rating: "3" },
      expectedOutput: {
        error: "Car Value must be a positive number",
      },
      expectedStatus: 400,
    },
    {
      input: { car_value: -5000, risk_rating: 3 },
      expectedOutput: { error: "Car Value must be a positive number" },
      expectedStatus: 400,
    },
    {
      input: { },
      expectedOutput: { error: "Car Value and Risk Rating are required" },
      expectedStatus: 400,
    }
  ];

  test.each(testCases)(
    "should return return expected output given the inputs",
    async ({ input, expectedOutput, expectedStatus }) => {
      const response = await request(app).post("/quote").send(input);
      const body = response.body;
      expect(response.status).toBe(expectedStatus);
      expect(response.body).toEqual(expectedOutput);
    }
  );
});

