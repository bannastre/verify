const app = require('../app');

const bcrypt = require('bcrypt');
const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../db/knex.js');
const logger = require('../helpers/logging');
const Document = require('../models/documents');

const { expect } = chai;

chai.use(chaiHttp);

describe('Document', () => {
  beforeEach((done) => {
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

  describe('#API Routes', () => {
    let dob;

    beforeEach(() => {
      dob = { name: 'dob', data: { day: 28, month: 10, year: 1983 } };
    });

    describe('success', () => {
      it('can get a document and return a Status of 200', () => {
        chai.request(app)
          .get('/documents')
          .end((err, res) => {
            if (err) { logger.error(err.message); }
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('Array').with.length(0);
          });
      });

      it('can post a document and encrypt the data', () => {
        chai.request(app)
          .post('/documents')
          .send(dob)
          .end((err, res) => {
            if (err) { logger.error(err.message); }
            expect(res).to.have.status(200);
            expect(res.body).to.haveOwnProperty('hash');
          });
      });

      it('can get a specific document', () => {
        chai.request(app)
          .post('/documents')
          .send(dob)
          .end((err, res) => {
            if (err) { logger.error(err.message); }
            chai.request(app)
              .get(`/documents/${res.body.id}`)
              .end((e, r) => {
                if (e) { logger.error(e.message); }
                expect(r).to.have.status(200);
                expect(res.body).to.haveOwnProperty('hash');
              });
          });
      });

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

  describe('Features', () => {
    let dob;
    let document;

    beforeEach(() => {
      dob = { name: 'dob', data: { day: 28, month: 10, year: 1983 } };
      document = new Document(dob);
    });

    describe('#encrypt', () => {
      describe('success', () => {
        it('should transform a string to a hash', async () => {
          const data = JSON.stringify(dob.data);
          const { hash } = await document;
          bcrypt.compare(data, hash, (err, res) => {
            if (err) { logger.error(err.message, 'test'); }
            expect(res).to.eql(true);
          });
        });
      });
    });
  });
});
