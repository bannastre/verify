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

  describe('#accept documents', () => {
    it('should allow a user to post JSON to the api', (done) => {
      const data = { dateOfBirth: '28.10.1983' };

      chai.request(app)
        .post('/document')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.eql(data);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
