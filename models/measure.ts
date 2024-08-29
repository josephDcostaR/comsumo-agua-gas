import mongoose, { Schema, Document } from 'mongoose';

interface IMeasure extends Document {
  measure_uuid: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
  value: number;
}

const measureSchema = new Schema({
  measure_uuid: { type: String, required: true },
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, enum: ['WATER', 'GAS'], required: true },
  has_confirmed: { type: Boolean, default: false },
  image_url: { type: String },
  value: { type: Number }
});

export const Measure = mongoose.model<IMeasure>('Measure', measureSchema);
