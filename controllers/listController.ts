import { Request, Response } from 'express';
import { Measure } from '../models/measure';

export const listMeasures = async (req: Request, res: Response) => {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  // Garantir que measure_type é uma string antes de usar toUpperCase()
  if (typeof measure_type === 'string' && !['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
    return res.status(400).json({
      error_code: 'INVALID_TYPE',
      error_description: 'Invalid measure type'
    });
  }

  const measures = await Measure.find({
    customer_code,
    measure_type: measure_type ? (typeof measure_type === 'string' ? measure_type.toUpperCase() : undefined) : undefined
  });

  if (measures.length === 0) {
    return res.status(404).json({
      error_code: 'MEASURES_NOT_FOUND',
      error_description: 'No measures found'
    });
  }

  return res.status(200).json({
    customer_code,
    measures
  });
};
