import request from "supertest";
import app from "./app";

describe("Success cases for /quote API (include edge cases)", () => {
  const successCases = [
    {
      input: { car_value: 5000, risk_rating: 1 },
      expectedOutput: { monthly_premium: 4.17, yearly_premium: 50 },
    },
    {
      input: { car_value: 100000000, risk_rating: 5 },
      expectedOutput: { monthly_premium: 416666.67, yearly_premium: 5000000 },
    },
    {
      input : { car_value: "5,000", risk_rating: 1 },
      expectedOutput: { monthly_premium: 4.17, yearly_premium: 50 },
    }
  ];

  test.each(successCases)(
    "should return correct premiums for input values",
    async ({ input, expectedOutput }) => {
      const response = await request(app).post("/quote").send(input);

      expect(response.status).toBe(200);
      expect(response.body.yearly_premium).toEqual(
        expectedOutput.yearly_premium,
       
      ); 
      expect(response.body.monthly_premium).toEqual(
        expectedOutput.monthly_premium,
        
      ); 
    },
  );
});

describe("Error cases for /quote API", () => {
  const errorCases = [
    {
      input: { car_value: 6614, risk_rating: 6 },
      expectedError: "Risk Rating must be between 1 and 5",
    },
    {
      input: { car_value: 6614, risk_rating: 0 },
      expectedError: "Car Value and Risk Rating are required",
    },
    {
      input: { car_value: 6614 },
      expectedError: "Car Value and Risk Rating are required",
    },
    {
      input: { risk_rating: 3 },
      expectedError: "Car Value and Risk Rating are required",
    },
    {
      input: { car_value: "Abc", risk_rating: "#$2" },
      expectedError: "Car Value and Risk Rating must be valid numbers",
    },
    {
      input: { car_value: -5000, risk_rating: 3 },
      expectedError: "Car Value must be a positive number",
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
