import { Request, Response } from 'express';
import geminiService from '../services/geminiService';
import { Measure } from '../models/measure';

export const uploadMeasure = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  if (!image || !customer_code || !measure_datetime || !measure_type) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Missing required fields'
    });
  }

  // Check if the measure_type is valid
  if (!['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
    return res.status(400).json({
      error_code: 'INVALID_TYPE',
      error_description: 'Invalid measure type'
    });
  }

  // Simulate checking for existing readings
  const existingMeasure = await Measure.findOne({ customer_code, measure_type, month: new Date(measure_datetime).getMonth() + 1 });
  if (existingMeasure) {
    return res.status(409).json({
      error_code: 'DOUBLE_REPORT',
      error_description: 'Leitura do mês já realizada'
    });
  }

  try {
    const result = await geminiService.extractMeasure(image);
    return res.status(200).json({
      image_url: result.image_url,
      measure_value: result.measure_value,
      measure_uuid: result.measure_uuid
    });
  } catch (error) {
    return res.status(500).json({
      error_code: 'INTERNAL_ERROR',
      error_description: 'Failed to process the image'
    });
  }
};
