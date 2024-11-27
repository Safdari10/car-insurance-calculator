import { Request, Response } from 'express';
import { calculateRiskRating } from '../models/api2Model';

export const getRiskRating = (req: Request, res: Response): void => {
  const { claim_history } = req.body;
  const result = calculateRiskRating(claim_history);
  res.json(result);
};