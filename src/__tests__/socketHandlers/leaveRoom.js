import { addHandlerListener } from '../../socketHandlers/leaveRoom';
import socket from '../../socketHandlers/index';
import sinon from 'sinon';

describe('src/socketHandlers/updateLocation.js', () => {
  afterAll(() => {
    socket.disconnect();
  });

  describe('The addHandlerListener function', () => {
    it('should call callback function with expected data', (done) => {
      const USER_ID = '209jlknq39';
      sinon.stub(socket, 'on').callsFake((type, callback) => {
        expect(type).toEqual('resultLeaveRoom');
        const data = {
          result: {
            data:{
              userId: USER_ID,
            }
          }
        };
        callback(data);
      });

      addHandlerListener((userId) => {
        expect(userId).toEqual(USER_ID);
        socket.on.restore();
        done();
      });
    });
  });
});