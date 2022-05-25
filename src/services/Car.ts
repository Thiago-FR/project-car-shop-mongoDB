import Service, { ServiceError } from '.';
import vehicleSchema, { Car } from '../interfaces/CarInterface';
import CarsModel from '../models/Car';

export default class CarService extends Service<Car> {
  constructor(model = new CarsModel()) {
    super(model);
  }

  async create(obj: Car): Promise<Car | null | ServiceError> {
    const parserd = vehicleSchema.safeParse(obj);

    if (!parserd.success) {
      return { error: parserd.error };
    }

    return this.model.create(obj);
  }
}