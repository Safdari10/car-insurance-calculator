import { Request, Response } from "express";
import { calculatePremiums } from "../models/api3Model";
import { validateQuote } from "../service/api3Validation";

export const index = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Welcome to my API" });
};

export const quote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { car_value, risk_rating } = req.body;

    const validatedInput = validateQuote(car_value, risk_rating);

    if (validatedInput.error) {
      res.status(400).json(validatedInput);
      return;

    } else {
      const { carValue, riskRating } = validatedInput;

      if (carValue && riskRating) {
        const premiums = calculatePremiums(carValue, riskRating);
        res.status(200).json(premiums);
      }
    }
  } catch (error) {
    console.error("Error processing quote:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
