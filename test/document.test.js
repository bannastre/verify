const app = require('../app');

const bcrypt = require('bcrypt');
const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../db/knex.js');
const logger = require('../helpers/logging');
const helpers = require('./helpers');
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
  describe('Hitting all API Routes', () => {
    context('success', () => {
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
          .send(helpers.dob)
          .end((err, res) => {
            if (err) { logger.error(err.message); }
            expect(res).to.have.status(200);
            expect(res.body).to.haveOwnProperty('hash');
          });
      });

      it('can get a specific document', () => {
        chai.request(app)
          .post('/documents')
          .send(helpers.dob)
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
          .send(helpers.dob)
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
          .send(helpers.dob)
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

  describe('#Processing different document types', () => {
    it('can post an address type document', () => {
      chai.request(app)
        .post('/documents')
        .send(helpers.address)
        .end((err, res) => {
          if (err) { logger.error(err.message); }
          expect(res).to.have.status(200);
          expect(res.body).to.haveOwnProperty('hash');
        });
    });
  });
});

describe('Features', () => {
  let dobDocument;
  let knownAddressDocument;

  beforeEach(() => {
    dobDocument = new Document(helpers.dob);
    knownAddressDocument = new Document(helpers.address);
  });

  describe('#encrypt', () => {
    describe('success', () => {
      it('should transform a string to a hash', async () => {
        const data = JSON.stringify(helpers.dob.data);
        const { hash } = await dobDocument;
        bcrypt.compare(data, hash, (err, res) => {
          if (err) { logger.error(err.message, 'test'); }
          expect(res).to.eql(true);
        });
      });
    });
    describe('failure', () => {
      it('should throw an error if the document is not stringified', async () => {
        const { data } = helpers.dob;
        const { hash } = await dobDocument;
        bcrypt.compare(data, hash, (err) => {
          expect(err.message).to.equal('data and hash must be strings');
        });
      });
    });
  });

  describe('#validate', () => {
    describe('success', () => {
      it('should validate a given document against known document', async () => {
        const result = await knownAddressDocument.verify(helpers.address);
        expect(result).to.equal(true);
      });
    });
    describe('failure', () => {
      it('should not validate a given document against known document when it doesn\'t match', async () => {
        const result = await knownAddressDocument.verify(helpers.dob);
        expect(result).to.equal(false);
      });
    });
  });
});
