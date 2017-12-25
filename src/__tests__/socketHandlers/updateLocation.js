import {emit, addHandlerListener} from '../../socketHandlers/updateLocation';
import socket from '../../socketHandlers/index';
import sinon, { expectation } from 'sinon';

describe('src/socketHandlers/updateLocation.js', () => {
  const LATITUDE = 12345;
  const LONGITUDE = 54321;
  const ROOM_ID = '8u08u348ur39u4tegf';
  const USER_ID = '209jlknq39';
  const USER_NAME = 'NAME_DESU';
  const ICON_URL = 'http://difasdfia.com/ijqf.png';

  afterAll(() => {
    socket.disconnect();
  });

  describe('The emit function', () => {
    it('should call socket.emit and passed args', (done) => {
      const mockLocation = createMockLocation(LATITUDE, LONGITUDE);

      sinon.stub(socket, 'emit').callsFake((type, data) => {
        expect(type).toEqual('updateLocation');
        expect(data.id).toEqual(USER_ID);
        expect(data.name).toEqual(USER_NAME);
        expect(data.iconUrl).toEqual(ICON_URL);
        expect(data.location).toEqual(mockLocation);
        expect(data.roomId).toEqual(ROOM_ID);

        socket.emit.restore();
        done();
      });

      emit({
        location: mockLocation,
        roomId: ROOM_ID,
        id: USER_ID,
        name: USER_NAME,
        iconUrl: ICON_URL
      });
    });
  });

  describe('The addHandlerListener function', () => {
    it('should call callback function with expected data', (done) => {
      const mockLocation = createMockLocation(LATITUDE, LONGITUDE);
      const parsedLocation = JSON.parse(mockLocation);

      sinon.stub(socket, 'on').callsFake((type, callback) => {
        expect(type).toEqual('resultUpdateLocation');
        const data = {
          result: {
            data:{
              id: USER_ID,
              name: USER_NAME,
              iconUrl: ICON_URL,
              location: parsedLocation
            }
          }
        };
        callback(data);
      });

      addHandlerListener(({id, name, iconUrl, location}) => {
        expect(id).toEqual(USER_ID);
        expect(name).toEqual(USER_NAME);
        expect(iconUrl).toEqual(ICON_URL);
        expect(location).toEqual(parsedLocation);

        socket.on.restore();
        done();
      });
    });
  });
});

const createMockLocation = (latitude, longitude) => {
  return JSON.stringify({latitude, longitude});
};