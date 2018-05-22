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
});
