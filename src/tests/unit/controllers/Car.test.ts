import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import server, { carsModel, carService } from '../../../server';

import { 
  carOne,
  carAll,
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
  describe('Create Succes', () => {
    before(() => {
      sinon
        .stub(carsModel, 'create')
        .resolves(carOne as any);
    });
  
    after(()=>{
      (carsModel.create as sinon.SinonStub).restore();
    })
  
    it('Test create Car /cars 201', (done) => {
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
  
    it('Test create Car /cars 400 "model"', (done) => {
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
  
    it('Test create Car /cars 400 "year"', (done) => {
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
  
    it('Test create Car /cars 400 "color"', (done) => {
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
  
    it('Test create Car /cars 400 "buyValue"', (done) => {
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
  
    it('Test create Car /cars 400 "doorsQty"', (done) => {
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
  
    it('Test create Car /cars 400 "seatsQty"', (done) => {
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

  describe('create Error car is undefined', () => {
    before(() => {
      sinon
        .stub(carService, 'create')
        .resolves(undefined);
    });
  
    after(()=>{
      (carService.create as sinon.SinonStub).restore();
    })
    
    it('Test create Car /cars 500"', (done) => {
      chai.request(server.app)
          .post('/cars')
          .end((_err, res) => {
            expect(res).to.have.status(500);
            expect(res).to.be.json;
            expect(res.text).to.be.includes(JSON.stringify('Internal Server Error'));
            done();
      });
    });
  });

  describe('create Error internal', () => {
    before(() => {
      sinon
        .stub(carService, 'create')
        .rejects(undefined);
    });
  
    after(()=>{
      (carService.create as sinon.SinonStub).restore();
    })
    
    it('Test create Car /cars 500"', (done) => {
      chai.request(server.app)
          .post('/cars')
          .end((_err, res) => {
            expect(res).to.have.status(500);
            expect(res).to.be.json;
            expect(res.text).to.be.includes(JSON.stringify('Internal Server Error'));
            done();
      });
    });
  });
});

describe('findAll Car', () => {
  before(() => {
    sinon
      .stub(carsModel, 'read')
      .resolves(carAll as any);
  });

  after(()=>{
    (carsModel.read as sinon.SinonStub).restore();
  })
  
  it('Test findAll Car /cars 200"', (done) => {
    chai.request(server.app)
        .get('/cars')
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.text).to.be.equal(JSON.stringify(carAll));
          done();
    });
  });
});

describe('findOne Car', () => {
  describe('findOne Success', () => {
    before(() => {
      sinon
        .stub(carsModel, 'readOne')
        .resolves(carOne as any);
    });
  
    after(()=>{
      (carsModel.readOne as sinon.SinonStub).restore();
    })
    
    it('Test findOne Car /cars 200"', (done) => {
      chai.request(server.app)
          .get('/cars/628e6fd7f5393b1087a936f7')
          .end((_err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.text).to.be.equal(JSON.stringify(carOne));
            done();
      });
    });
  });

  describe('findOne Error', () => {
    before(() => {
      sinon
        .stub(carsModel, 'readOne')
        .resolves(carOne as any);
    });
  
    after(()=>{
      (carsModel.readOne as sinon.SinonStub).restore();
    })
    
    it('findOne Bad Request min Id 400', (done) => {
      chai.request(server.app)
          .get('/cars/628e6fd7f5393b10')
          .end((_err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.text).to.be.includes(JSON.stringify('Id must have 24 hexadecimal characters'));
            done();
      });
    });
  });

  describe('findOne Error internal', () => {
    before(() => {
      sinon
        .stub(carService, 'create')
        .rejects(undefined);
    });
  
    after(()=>{
      (carService.create as sinon.SinonStub).restore();
    })
    
    it('Test findOne Car /cars:id 500"', (done) => {
      chai.request(server.app)
          .get('/cars/628e6fd7f5393b1087a936f7')
          .end((_err, res) => {
            expect(res).to.have.status(500);
            expect(res).to.be.json;
            expect(res.text).to.be.includes(JSON.stringify('Internal Server Error'));
            done();
      });
    });
  });
});