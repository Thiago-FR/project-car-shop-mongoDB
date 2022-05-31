import { model as createModel } from 'mongoose';
import CustomRouter from './routes/Router';
import App from './app';

import { Car } from './interfaces/CarInterface';
import CarsModel, { carSchema } from './models/Car';
import CarService from './services/Car';
import CarController from './controllers/Car';
import MotorcycleService from './services/Motorcycle';
import MotorcycleController from './controllers/Motorcycle';
import MotorcycleModel, { motorcycleSchema } from './models/Motorcycle';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

export const carsModel = new CarsModel(createModel('cars', carSchema));
export const carService = new CarService(carsModel);
export const carController = new CarController(carService);

export const motorcyclesModel = new MotorcycleModel(
  createModel('motorcycles', motorcycleSchema),
);
export const motorcyclesService = new MotorcycleService(motorcyclesModel);
export const motorcyclesController = new MotorcycleController(
  motorcyclesService,
);

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

const motorcyclesRouter = new CustomRouter<Motorcycle>();
motorcyclesRouter.addRoute(motorcyclesController);

server.addRouter(carRouter.router);
server.addRouter(motorcyclesRouter.router);

export default server;
