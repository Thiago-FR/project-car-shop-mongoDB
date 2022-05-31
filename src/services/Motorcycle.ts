import Service, { ServiceError } from '.';
import vehicleSchema, { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/Motorcycle';

export default class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  async create(obj: Motorcycle): Promise<Motorcycle | null | ServiceError> {
    const parserd = vehicleSchema.safeParse(obj);

    if (!parserd.success) {
      return { error: parserd.error };
    }

    return this.model.create(obj);
  }
}