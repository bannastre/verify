const app = require('../app');

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);


describe('Document', () => {
  let dob;

  beforeEach((done) => {
    dob = { name: 'dob', payload: { day: 28, month: 10, year: 1983 } };
    done();
  });

  describe('#read documents', () => {
    it('should get a document and return a Status of OK', (done) => {
      chai.request(app)
        .get('/document')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal('OK');
          done();
        });
    });
  });

  describe('#create documents', () => {
    describe('success', () => {
      it('can post a document and encrypt the payload', (done) => {
        chai.request(app)
          .post('/document')
          .send(dob)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.eql(dob.payload);
            done();
          });
      });
    });
  });

  describe('#create documents', () => {
    describe('success', () => {
      it('can post a document and encrypt the payload', (done) => {
        chai.request(app)
          .patch('/document')
          .send(dob)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.eql({ dob });
            done();
          });
      });
    });
  });

  describe('#create documents', () => {
    describe('success', () => {
      it('can post a document and encrypt the payload', (done) => {
        chai.request(app)
          .delete('/document')
          .send(dob)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.eql({ dob });
            done();
          });
      });
    });
  });
});
