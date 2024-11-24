import { Request, Response } from "express";
import { calculatePremiums } from "../models/api3Model";

export const index = (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to my API" });
};

export const quote = async (req: Request, res: Response): Promise<Response> => {
  const { car_value, risk_rating } = req.body;

  try {
    const premiums = calculatePremiums(car_value, risk_rating);
    return res.status(200).json(premiums);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
