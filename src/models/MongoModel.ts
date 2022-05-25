import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface'; 

abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  async read(): Promise<T[]> {
    return this.model.find();
  }

  async readOne(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id });
  }

  async update(id: string, obj: T): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, obj);
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}

export default MongoModel;