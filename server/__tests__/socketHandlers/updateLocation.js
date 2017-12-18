import { updateLocation } from '../../socketHandlers/updateLocation';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler( updateLocation );
describe('server/socketHandlers/updateLocation.js', () => {
  const DUMMY_ROOM_ID = 'DUMMY_ROOM_ID';
  const DUMMY_LOCATION = {
    latitude: -9999,
    longitude: 9999
  };

  it('calls socket.on, namespace.adapter.method and socket.emit.', () => {
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
    expect(receivedDataFromEmit).toEqual({
      result: {
        data: 'TODO: notify locations of all users to all.'
      }
    });
  });

  it('should includes error in emitted data when `roomId` is not passed.', () => {
    let receivedEventTypeFromOn = '';
    const callbackForOn = (eventType, callback) => {
      receivedEventTypeFromOn = eventType;
      callback({
        location: DUMMY_LOCATION
      });
    };

    let receivedDataToSocketIdFromEmit = null;
    const callbackForEmitOfSocket = (eventType, data) => {
      receivedDataToSocketIdFromEmit = data;
    };

    let receivedBroadcastedDataFromEmit = null;
    const callbackForEmitOfNameSpace = (eventType, data) => {
      receivedBroadcastedDataFromEmit = data;
    };

    const socket = createDummySocket(callbackForOn, callbackForEmitOfSocket);
    const nameSpace = createDummyNameSpace(callbackForEmitOfNameSpace);

    updateLocation(socket, nameSpace);
    expect(receivedDataToSocketIdFromEmit).toEqual({
      result: {
        error: new Error('Need to put a roomId')
      }
    });
    expect(receivedBroadcastedDataFromEmit).toEqual(null);
  });

  it('should includes error in emitted data when `location` is not passed.', () => {
    let receivedEventTypeFromOn = '';
    const callbackForOn = (eventType, callback) => {
      receivedEventTypeFromOn = eventType;
      callback({
        roomId: DUMMY_ROOM_ID,
      });
    };

    let receivedDataToSocketIdFromEmit = null;
    const callbackForEmitOfSocket = (eventType, data) => {
      receivedDataToSocketIdFromEmit = data;
    };

    let receivedBroadcastedDataFromEmit = null;
    const callbackForEmitOfNameSpace = (eventType, data) => {
      receivedBroadcastedDataFromEmit = data;
    };

    const socket = createDummySocket(callbackForOn, callbackForEmitOfSocket);
    const nameSpace = createDummyNameSpace(callbackForEmitOfNameSpace);

    updateLocation(socket, nameSpace);
    expect(receivedDataToSocketIdFromEmit).toEqual({
      result: {
        error: new Error('Need to put a location that includes latitude and longitude properties.')
      }
    });
    expect(receivedBroadcastedDataFromEmit).toEqual(null);
  });
});