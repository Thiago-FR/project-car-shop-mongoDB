import Model from "../../interfaces/ModelInterface"
import MockModel from "./MockModel";

export default class MockService<T>{
  constructor(protected model = new MockModel()) {}

  async create(obj: T): Promise<any> {
    return this.model.create(obj);
  }

  async read(): Promise<any> {
    return this.model.read();
  }

  async readOne(id: string): Promise<any> {
    return this.model.readOne(id);
  }

  // async update(id: string, obj: T): Promise<any> {
  //   return obj;
  // }

  // async delete(id: string): Promise<any> {
  //   return id as unknown as T;
  // }
}