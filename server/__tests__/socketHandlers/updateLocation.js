import { updateLocation } from '../../socketHandlers/updateLocation';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler( updateLocation );
describe('server/socketHandlers/updateLocation.js', () => {
  it('calls socket.on, namespace.adapter.method and socket.emit.', () => {
    const DUMMY_ROOM_ID = 'DUMMY_ROOM_ID';
    const DUMMY_LOCATION = {
      latitude: -9999,
      longitude: 9999
    };

    let receivedEventTypeFromOn = '';
    const callbackForOn = (eventType, callback) => {
      receivedEventTypeFromOn = eventType;
      callback({
        roomId: DUMMY_ROOM_ID,
        location: DUMMY_LOCATION
      });
    };

    let receivedEventTypeFromEmit = '';
    let receivedDataFromEmit = null;
    const callbackForEmit = (eventType, data) => {
      receivedEventTypeFromEmit = eventType;
      receivedDataFromEmit = data;
    };

    const socket = createDummySocket(callbackForOn);

    const nameSpace = createDummyNameSpace(callbackForEmit);

    updateLocation(socket, nameSpace);

    expect(receivedEventTypeFromOn).toEqual('updateLocation');
    expect(receivedEventTypeFromEmit).toEqual('resultUpdateLocation');
    expect(receivedDataFromEmit).toEqual('TODO: notify locations of all users to all.');
  });
});