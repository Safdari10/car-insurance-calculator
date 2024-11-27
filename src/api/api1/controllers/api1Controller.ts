// Contains business logic for handling requests.

import { Request, Response } from 'express';

export const calculateCarValue = (req: Request, res: Response): void => {
    const { model, year } = req.body;

    // Input validation
    if (typeof model !== 'string' || typeof year !== 'number' || year < 1886 || year > new Date().getFullYear()) {
        res.status(400).json({ error: 'there is an error' });
        return;
    }

    // Calculate car value
    const alphabetValue = model.replace(/[^a-zA-Z]/g, '').toUpperCase()
        .split('')
        .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);

    const carValue = alphabetValue * 100 + year;
    res.status(200).json({ car_value: carValue })};