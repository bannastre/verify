const app = require('../app');

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);


describe('Document', () => {
  describe('#status', () => {
    it('should return a Status of OK', (done) => {
      chai.request(app)
        .get('/document')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal('OK');
          expect(res.body.router).to.equal('document');
          done();
        });
    });
  });

  describe('#classify documents', () => {
    describe('success', () => {
      it('can classify a document', (done) => {
        const data = { type: 'id', dateOfBirth: '28.10.1983' };

        chai.request(app)
          .post('/document')
          .send(data)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.eql('id');
            done();
          });
      });
    });

    describe('failure', () => {
      it('throws an error if the document type is not supplied', (done) => {
        const data = { invalid: 'document' };

        chai.request(app)
          .post('/document')
          .send(data)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.eql('Document Type must be Supplied');
            done();
          });
      });
    });
  });
});
