import { Request, Response } from "express";
import { calculatePremiums } from "../models/api3Model";

export const index = (req: Request, res: Response) => {
  res.status(200).json({ message: "welcome to my api" });
};

export const quote = async (req: Request, res: Response): Promise<Response> => {
  const { car_value, risk_rating } = req.body;

  try {
    // Calculate premiums
    const premiums = calculatePremiums(car_value, risk_rating);

    // Return the calculated premiums
    return res.status(200).json(premiums);
  } catch (error) {
    if (error instanceof Error) {
      // Handle known error
      return res.status(400).json({ error: error.message });
    } else {
      // Handle unexpected errors
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
