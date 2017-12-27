import {addHandlerListener} from '../../socketHandlers/connect';
import socket from '../../socketHandlers/index';
import sinon from 'sinon';

describe('src/socketHandlers/connect.js', () => {
  afterAll(() => {
    socket.disconnect();
  });

  describe('The addHandlerListener function', () => {
    it('should call callback function with socket', (done) => {
      sinon.stub(socket, 'on').callsFake((type, callback) => {
        expect(type).toEqual('connect');
        callback(socket);
      });

      addHandlerListener((_socket) => {
        expect(socket).toEqual(_socket);
        socket.on.restore();
        done();
      });
    });
  });
});