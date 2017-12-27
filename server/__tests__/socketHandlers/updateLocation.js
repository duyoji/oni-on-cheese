import { updateLocation } from '../../socketHandlers/updateLocation';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';
import { Nohm } from 'nohm';
import { getRedisClient } from '../../redis/client';

// Delete data created by this test from Redis
// after finishing this test.
// This prefix should be unique not to delete other data in Redis.
const PREFIX_FOR_TEST = 'server/__tests__/socketHandlers/updateLocation.js';
Nohm.setPrefix(PREFIX_FOR_TEST);

commonTestForSocketHandler( updateLocation );
describe('server/socketHandlers/updateLocation.js', () => {
  const DUMMY_ROOM_ID = 'DUMMY_ROOM_ID';
  const DUMMY_LOCATION = {
    latitude: -9999,
    longitude: 9999
  };
  const DUMMY_NAME = 'USER_NAME';
  const DUMMY_ICON_URL = 'https://oni-on-cheese.heroku.com/icon.png'

  beforeAll((done) => {
    // Wait for connecting to redis
    setTimeout(() => done(), 100);
  });

  afterAll(async (done) => {
    // Need to quit to finish test completely.
    getRedisClient().keys(`${PREFIX_FOR_TEST}*`, async (err, keys) => {
      for(let i = 0; i < keys.length; i++) {
        await getRedisClient().delAsync(keys[i]);
      }
      getRedisClient().quit();
      done();
    });
  });

  it('creates new user data in redis when redis does not have the user data', (done) => {
    const callbackForOn = (eventType, callback) => {
      expect(eventType).toEqual('updateLocation');
      callback({
        roomId: DUMMY_ROOM_ID,
        location: DUMMY_LOCATION,
        name: DUMMY_NAME,
        iconUrl: DUMMY_ICON_URL
      });
    };

    // `updateLocation` has async code.
    // So `expect` put into async function.
    const callbackForEmit = (eventType, data) => {
      expect(eventType).toEqual('resultUpdateLocation');
      expect(data).toEqual({
        result: {
          data: {
            id: socket.id,
            name: DUMMY_NAME,
            iconUrl: DUMMY_ICON_URL,
            location: DUMMY_LOCATION
          }
        }
      });
      done();
    };

    const socket = createDummySocket(callbackForOn);
    const nameSpace = createDummyNameSpace(callbackForEmit);
    updateLocation(socket, nameSpace);
  });

  it('should includes error in emitted data when `roomId` is not passed.', () => {
    const callbackForOn = (eventType, callback) => { // eslint-disable-line no-unused-vars
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
    const callbackForOn = (eventType, callback) => { // eslint-disable-line no-unused-vars
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