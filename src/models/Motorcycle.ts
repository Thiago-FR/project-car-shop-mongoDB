import { model as createModel, Schema, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

interface MotorcycleDocument extends Motorcycle, Document { }

export const MotorcycleSchema = new Schema<MotorcycleDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('motorcycles', MotorcycleSchema)) {
    super(model);
  }
}