import { Request, Response } from "express"

export const index = (req: Request, res: Response) => {
    res.status(200).json({ message: "welcome to my api"})
}

export const quote = (req: Request, res: Response) => {
    const { car_value, risk_rating } = req.body

    const yearly_premium = car_value * risk_rating / 100
    const monthly_premium = yearly_premium / 12

    return res.status(200).json({
        yearly_premium: yearly_premium,
        monthly_premium: monthly_premium
    })
}