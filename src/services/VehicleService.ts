import Service, { ServiceError } from '.';
import vehicleSchema from '../interfaces/VehicleInterface';
import { Model } from '../interfaces/ModelInterface';

export default class VehicleService<T> extends Service<T> {
  constructor(public model: Model<T>, public schema: typeof vehicleSchema) {
    super(model);
  }

  async create(obj: T): Promise<T | null | ServiceError> {
    const parserd = this.schema.safeParse(obj);

    if (!parserd.success) {
      return { error: parserd.error };
    }

    return this.model.create(obj);
  }
}