import { Request, Response } from "express"

export const index = (req: Request, res: Response) => {
    res.status(200).json({ message: "welcome to my api"})
}