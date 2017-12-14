import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import * as controller from '../../../api/rooms/controller';

const PORT = 9999;
const END_POINT = '/api/rooms';

const server = app.listen(PORT);
chai.use(chaiHttp);

describe('server/api/rooms/controller.js', () => {

  afterAll((done) => {
    // This code is for closing this test after finishing all test in this file.
    server.close(done);
  });

  it('should exist.', () => {
    expect(typeof controller).toEqual('object');
  });

  it('should have handlers for router', () => {
    const expectedHandlerNames = [
      'getRooms',
    ];

    expectedHandlerNames.forEach(handlerName => {
      expect(typeof controller[handlerName])
        .toEqual('function');
      expect(controller[handlerName].length)
        .toEqual(2, 'handler should take 2 arguments `req` and `res`.');
    });
  });

  describe('GET /api/rooms: ', () => {
    it('should fetch data', (done) => (
      chai.request(server)
        .get(END_POINT)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toEqual(null);
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).results).toEqual('getRooms');
          done();
        })
    ));
  });
});