import { Router } from 'express';
import Controller from '../controllers';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, (req, res) => controller.read(req, res));
    this.router.get(`${route}/:id`, (req, res) => controller.readOne(req, res));
    this.router.post(route, (req, res) => controller.create(req, res));
    this.router.put(`${route}/:id`, (req, res) => controller.update(req, res));
    this.router
      .delete(`${route}/:id`, (req, res) => controller.delete(req, res));
  }
}

export default CustomRouter;