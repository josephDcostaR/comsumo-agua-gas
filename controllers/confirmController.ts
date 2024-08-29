import { Request, Response } from 'express';
import { Measure } from '../models/measure';

export const confirmMeasure = async (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;

  if (!measure_uuid || confirmed_value === undefined) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Missing required fields'
    });
  }

  const measure = await Measure.findOne({ measure_uuid });
  if (!measure) {
    return res.status(404).json({
      error_code: 'MEASURE_NOT_FOUND',
      error_description: 'Measure not found'
    });
  }

  if (measure.has_confirmed) {
    return res.status(409).json({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Measure already confirmed'
    });
  }

  measure.value = confirmed_value;
  measure.has_confirmed = true;
  await measure.save();

  return res.status(200).json({ success: true });
};
