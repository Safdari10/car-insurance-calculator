import request from "supertest";
import app from "../app";
import { validateQuote } from "../service/api3Validation";
import { calculatePremiums } from "../models/api3Model";

// Mock the validateQuote function
jest.mock("../service/api3Validation", () => ({
    validateQuote: jest.fn(),
}));

// Mock the calculatePremiums function
jest.mock("../models/api3Model", () => ({
    calculatePremiums: jest.fn(),
}));

describe("should handle internal server errors", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should handle validation error", async () => {
        (validateQuote as jest.Mock).mockImplementation(() => {
            throw new Error("Error in validation");
        });

        const response = await request(app).post("/quote").send({ car_value: 5000, risk_rating: 1 });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Internal Server Error" });
    });
    
    test("should handle calculation error", async () => {
        (calculatePremiums as jest.Mock).mockImplementation(() => {
            throw new Error("Error in calculation");
        });

        const response = await request(app).post("/quote").send({ car_value: 5000, risk_rating: 1 });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Internal Server Error" });
    });

    test("should handle both validation and calculation errors", async () => {
        (validateQuote as jest.Mock).mockImplementation(() => {
            throw new Error("Error in validation");
        });
        (calculatePremiums as jest.Mock).mockImplementation(() => {
            throw new Error("Error in calculation");
        });

        const response = await request(app).post("/quote").send({ car_value: 5000, risk_rating: 1 });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Internal Server Error" });
    });

});
