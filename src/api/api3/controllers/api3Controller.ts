import { Request, Response } from "express";
import { calculatePremiums } from "../models/api3Model";

export const index = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Welcome to my API" });
};

export const quote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { car_value, risk_rating } = req.body;

    // Ensure car_value and risk_rating are provided
    if (!car_value || !risk_rating) {
      res.status(400).json({ error: "Car Value and Risk Rating are required" });
      return;
    }

    // Sanitize and parse inputs
    const sanitizedCarValue = car_value.toString().replace(/,/g, "");
    const sanitizedRiskRating = risk_rating.toString().replace(/,/g, "");

    const carValue = parseInt(sanitizedCarValue, 10);
    const riskRating = parseInt(sanitizedRiskRating, 10);

    // Validate inputs
    if (isNaN(carValue) || isNaN(riskRating)) {
      res.status(400).json({ error: "Car Value and Risk Rating must be valid numbers" });
      return;
    }

    if (carValue <= 0) {
      res.status(400).json({ error: "Car Value must be a positive number" });
      return;
    }

    if (riskRating < 1 || riskRating > 5) {
      res.status(400).json({ error: "Risk Rating must be between 1 and 5" });
      return;
    }

    // Calculate premiums
    const premiums = calculatePremiums(carValue, riskRating);
    res.status(200).json(premiums);
  } catch (error) {
    console.error("Error processing quote:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
