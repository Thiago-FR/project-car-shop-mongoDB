import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import MotorcycleService from '../services/Motorcycle';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

export default class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service: MotorcycleService,
    route = '/motorcycles',
  ) {    
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  async create(
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> {
    const { body } = req;
    try {
      const motorcycle = await this.service.create(body);
      if (!motorcycle) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in motorcycle) {
        return res.status(400).json(motorcycle);
      }
      return res.status(201).json(motorcycle);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  async readOne(
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.minLengthId });
      }
      const motorcycle = await this.service.readOne(id);
      return motorcycle
        ? res.json(motorcycle)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  async update(
    req: RequestWithBody<Motorcycle & { id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.minLengthId });
      }
      if (!Object.keys(req.body).length) {
        return res.status(400).json({ error: this.errors.bodyEmpty });
      }
      const motorcycle = await this.service.update(id, req.body);
      return motorcycle
        ? res.json(motorcycle)
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
      const motorcycle = await this.service.readOne(id);
      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      await this.service.delete(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }
}