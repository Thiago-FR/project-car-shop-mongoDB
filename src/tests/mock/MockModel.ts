import Model from "../../interfaces/ModelInterface"

export default class MockModel<T> implements Model<T>{
  async create(obj: T): Promise<T> {
    return obj;
  }

  async read(): Promise<T[]> {
    return [true] as any as T[];
  }

  async readOne(id: string): Promise<T | null> {
    return id as any as T;
  }

  async update(id: string, obj: T): Promise<T | null> {
    return obj;
  }

  async delete(id: string): Promise<void> { return }
}