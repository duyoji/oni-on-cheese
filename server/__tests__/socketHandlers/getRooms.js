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
    const callbackForOn = (eventType) => {
      receivedEventTypeFromOn = eventType;
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
    let calledCallbackOfNameSpace = false;
    const nameSpace = createDummyNameSpace();
    nameSpace.adapter['allRooms'] = (fn) => {
      fn(err, expectedEmitData);
    };

    getRooms(socket, nameSpace);
    expect(receivedEventTypeFromOn).toEqual('getRooms');
    expect(receivedEventTypeFromEmit).toEqual('resultGetRooms');
    expect(receivedDataFromEmit).toEqual(expectedEmitData);
  });
});