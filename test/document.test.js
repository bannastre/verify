const app = require('../app');

const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../db/knex.js');
const logger = require('../helpers/logging');

const { expect } = chai;

chai.use(chaiHttp);

describe('Document', () => {
  let dob;

  beforeEach((done) => {
    dob = { name: 'dob', payload: { day: 28, month: 10, year: 1983 } };
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => done())
      .catch(done);
  });

  afterEach((done) => {
    knex.migrate.rollback()
      .then(() => done())
      .catch(done);
  });

  describe('#read documents', () => {
    it('should get a document and return a Status of OK', () => {
      chai.request(app)
        .get('/documents')
        .end((err, res) => {
          if (err) { logger.error(err.message); }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Array').with.length(0);
        });
    });
  });

  describe('#create documents', () => {
    describe('success', () => {
      it('can post a document and encrypt the payload', () => {
        chai.request(app)
          .post('/documents')
          .send(dob)
          .end((err, res) => {
            if (err) { logger.error(err.message); }
            expect(res).to.have.status(200);
            expect(res.body.hash).to.eql(JSON.stringify(dob.payload));
          });
      });
    });
  });

  describe('#update documents', () => {
    describe('success', () => {
      it('can patch a document', () => {
        chai.request(app)
          .post('/documents')
          .send(dob)
          .end((err, res) => {
            if (err) { logger.error(err.message); }
            expect(res).to.have.status(200);
            const newDob = { hash: { day: 29, month: 10, year: 1983 } };
            chai.request(app)
              .patch('/documents/1')
              .send(newDob)
              .end((e, r) => {
                if (e) { logger.error(e.message); }
                expect(r).to.have.status(200);
                expect(r.body.rowsUpdated).to.eql(1);
              });
          });
      });
    });
  });

  describe('#delete documents', () => {
    describe('success', () => {
      it('can delete a document', () => {
        chai.request(app)
          .post('/documents')
          .send(dob)
          .end((err, res) => {
            if (err) { logger.error(err.message); }
            expect(res).to.have.status(200);
            chai.request(app)
              .delete('/documents/1')
              .end((e, r) => {
                if (e) { logger.error(e.message); }
                expect(r).to.have.status(200);
                expect(r.body.rowsUpdated).to.eql(1);
              });
          });
      });
    });
  });
});
