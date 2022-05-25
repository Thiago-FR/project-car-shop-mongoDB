import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import server, { carsModel } from '../../../server';

import { 
  carOne,
  createCar,
  createCarFaled_1,
  createCarFaled_2,
  createCarFaled_3,
  createCarFaled_5,
  createCarFaled_6,
  createCarFaled_7,
} from '../../mock/Car';

chai.use(chaiHttp);

const { expect } = chai;

describe('Create Car', () => {
  before(() => {
    sinon
      .stub(carsModel, 'create')
      .resolves(carOne as any);
  });

  after(()=>{
    (carsModel.create as sinon.SinonStub).restore();
  })

  it('Test /cars 201', (done) => {
    chai.request(server.app)
        .post('/cars')
        .send(createCar)
        .end((_err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.text).to.be.equal(JSON.stringify(carOne));
          done();
    });
  });

  it('Test /cars 400 "model"', (done) => {
    chai.request(server.app)
        .post('/cars')
        .send(createCarFaled_1)
        .end((_err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          done();
    });
  });

  it('Test /cars 400 "year"', (done) => {
    chai.request(server.app)
        .post('/cars')
        .send(createCarFaled_2)
        .end((_err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          done();
    });
  });

  it('Test /cars 400 "color"', (done) => {
    chai.request(server.app)
        .post('/cars')
        .send(createCarFaled_3)
        .end((_err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          done();
    });
  });

  it('Test /cars 400 "buyValue"', (done) => {
    chai.request(server.app)
        .post('/cars')
        .send(createCarFaled_5)
        .end((_err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          done();
    });
  });

  it('Test /cars 400 "doorsQty"', (done) => {
    chai.request(server.app)
        .post('/cars')
        .send(createCarFaled_6)
        .end((_err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          done();
    });
  });

  it('Test /cars 400 "seatsQty"', (done) => {
    chai.request(server.app)
        .post('/cars')
        .send(createCarFaled_7)
        .end((_err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          done();
    });
  });
});