// Contains business logic for handling requests.

import { Request, Response } from 'express';
import { CarValueModel } from '../models/api1Model';

export const calculateCarValue = (req: Request, res: Response): void => {
    const { model, year } = req.body;

    const validationError = CarValueModel.validateInput(model, year);
    if (validationError) {
        res.status(400).json({ error: validationError });
        return;
    }

    const carValue = CarValueModel.calculateValue(model, year);
    res.status(200).json({ car_value: carValue });
};
