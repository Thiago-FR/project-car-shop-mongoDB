import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import Service from '../services';

export default class VehicleController<T> extends Controller<T> {
  private _route: string;

  constructor(
    route: string,
    service: Service<T>,
  ) {    
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  async create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> {
    const { body } = req;
    try {
      const vehicle = await this.service.create(body);
      if (!vehicle) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in vehicle) {
        return res.status(400).json(vehicle);
      }
      return res.status(201).json(vehicle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  async readOne(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.minLengthId });
      }
      const vehicle = await this.service.readOne(id);
      return vehicle
        ? res.json(vehicle)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  async update(
    req: RequestWithBody<T & { id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.minLengthId });
      }
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ error: this.errors.bodyEmpty });
      }
      const vehicle = await this.service.update(id, req.body);
      return vehicle
        ? res.json(vehicle)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  async delete(
    req: Request<{ id: string }>,
    res: Response<void | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.minLengthId });
      }
      const vehicle = await this.service.readOne(id);
      if (!vehicle) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      await this.service.delete(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }
}