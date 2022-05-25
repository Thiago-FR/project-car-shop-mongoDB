import { model as createModel } from 'mongoose';
import CustomRouter from './routes/Router';
import App from './app';

import { Car } from './interfaces/CarInterface';
import CarsModel, { carSchema } from './models/Car';
import CarService from './services/Car';
import CarController from './controllers/Car';

const server = new App();

export const carsModel = new CarsModel(createModel('cars', carSchema));
const carService = new CarService(carsModel);
export const carController = new CarController(carService);

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;
