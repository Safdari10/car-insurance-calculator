import { Request, Response } from "express"
import { calculatePremiums } from "../models/api3Model"

export const index = (req: Request, res: Response) => {
    res.status(200).json({ message: "welcome to my api"})
}

export const quote = (req: Request, res: Response) => {
    const { car_value, risk_rating } = req.body

   try {
    const premiums = calculatePremiums(car_value, risk_rating)
    return res.status(200).json(premiums)
   } catch (error) {
    
   }

}