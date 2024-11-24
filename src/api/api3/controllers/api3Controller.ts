import { Request, Response } from "express";
import { calculatePremiums } from "../models/api3Model";

export const index = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Welcome to my API" });
};

export const quote = async (req: Request, res: Response): Promise<void> => {
  const { car_value, risk_rating } = req.body;
  
  if( car_value === "" || risk_rating === "" ) {
    res.status(400).json({ error: "Car value and Risk rating are required"})
  }

  if (typeof car_value !== "number" || typeof risk_rating !== "number") {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  if (car_value <= 0) {
    res.status(400).json({ error: "Car value must be a positive number" });
    return;
  }

  if (risk_rating <= 0 || risk_rating >= 6) {
    res.status(400).json({ error: "Risk Rating is invalid" });
    return;
  }

  try {
    const premiums = calculatePremiums(car_value, risk_rating);
    res.status(200).json(premiums);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
