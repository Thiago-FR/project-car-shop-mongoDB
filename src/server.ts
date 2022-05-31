import { model as createModel } from 'mongoose';
import CustomRouter from './routes/Router';
import App from './app';

import CarValidate, { Car } from './interfaces/CarInterface';
import CarsModel, { carSchema } from './models/Car';
import MotorcycleModel, { motorcycleSchema } from './models/Motorcycle';
import 
MotorcycleValidade,
{ Motorcycle } from './interfaces/MotorcycleInterface';
import VehicleService from './services/VehicleService';
import VehicleController from './controllers/VehicleController';

const server = new App();

export const carsModel = new CarsModel(createModel('cars', carSchema));
export const carService = new VehicleService<Car>(
  carsModel,
  CarValidate,
);
export const carController = new VehicleController<Car>('/cars', carService);

export const motorcyclesModel = new MotorcycleModel(
  createModel('motorcycles', motorcycleSchema),
);
export const motorcyclesService = new VehicleService<Motorcycle>(
  motorcyclesModel,
  MotorcycleValidade,
);
export const motorcyclesController = new VehicleController<Motorcycle>(
  '/motorcycles',
  motorcyclesService,
);

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

const motorcyclesRouter = new CustomRouter<Motorcycle>();
motorcyclesRouter.addRoute(motorcyclesController);

server.addRouter(carRouter.router);
server.addRouter(motorcyclesRouter.router);

export default server;
