import { Request, Response } from "express";
import { calculatePremiums } from "../models/api3Model";

export const index = (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to my API" });
};

export const quote = (req: Request, res: Response): void => {
  const { car_value, risk_rating } = req.body;

  try {
    // Calculate premiums
    const premiums = calculatePremiums(car_value, risk_rating);

    // Send the calculated premiums as the response
    res.status(200).json(premiums);  
  } catch (error) {
    if (error instanceof Error) {
      // Handle known error
      res.status(400).json({ error: error.message });
    } else {
      // Handle unexpected errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
