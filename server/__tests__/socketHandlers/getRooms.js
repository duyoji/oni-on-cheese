import { getRooms } from '../../socketHandlers/getRooms';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler( getRooms );
describe('server/socketHandlers/getRooms.js', () => {
  it('calls on, adapter method and emit.', () => {
    let receivedEventTypeFromOn = '';
    const callbackForOn = (eventType, callback) => {
      receivedEventTypeFromOn = eventType;
      callback();
    };

    let receivedEventTypeFromEmit = '';
    let receivedDataFromEmit = null;
    const callbackForEmit = (eventType, data) => {
      receivedEventTypeFromEmit = eventType;
      receivedDataFromEmit = data;
    };

    const socket = createDummySocket(
      callbackForOn,
      callbackForEmit // called in namespace.adapter method.
    );

    const err = null;
    const expectedEmitData = ['room1', 'room2'];
    const nameSpace = createDummyNameSpace();
    nameSpace.adapter['allRooms'] = (fn) => {
      fn(err, expectedEmitData);
    };

    getRooms(socket, nameSpace);
    expect(receivedEventTypeFromOn).toEqual('getRooms');
    expect(receivedEventTypeFromEmit).toEqual('resultGetRooms');
    expect(receivedDataFromEmit).toEqual({
      result: {
        data: expectedEmitData
      }
    });
  });

  it('should include error if there is error', () => {
    const callbackForOn = (eventType, callback) => { // eslint-disable-line no-unused-vars
      callback();
    };

    let receivedEventTypeFromEmit = ''; // eslint-disable-line no-unused-vars
    let receivedDataFromEmit = null;
    const callbackForEmit = (eventType, data) => {
      receivedEventTypeFromEmit = eventType;
      receivedDataFromEmit = data;
    };

    const socket = createDummySocket(
      callbackForOn,
      callbackForEmit // called in namespace.adapter method.
    );

    const err = new Error('DUMMY_ERROR');
    const expectedEmitData = undefined;
    const nameSpace = createDummyNameSpace();
    nameSpace.adapter['allRooms'] = (fn) => {
      fn(err, expectedEmitData);
    };

    getRooms(socket, nameSpace);
    expect(receivedDataFromEmit).toEqual({
      result: {
        error: err
      }
    });
    expect(receivedDataFromEmit.result.error.message).toEqual(err.message);
  });
});