import { getRooms } from '../../socketHandlers/getRooms';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler( getRooms );
describe('server/socketHandlers/getRooms.js', () => {
  it('calls on, adter method and emit.', () => {
    let calledCallbackForOn = false;
    let calledCallbackForEmit = false;
    let receivedEventTypeFromOn = '';
    let receivedEventTypeFromEmit = '';
    let receivedDataFromEmit = null;

    const callbackForOn = (eventType) => {
      receivedEventTypeFromOn = eventType;
      calledCallbackForOn = true;
    };

    const callbackForEmit = (eventType, data) => {
      receivedEventTypeFromEmit = eventType;
      receivedDataFromEmit = data;

      calledCallbackForEmit = true;
    };

    const socket = createDummySocket(
      callbackForOn,
      callbackForEmit // called in namespace.adapter method.
    );

    const err = null;
    const expectedEmitData = ['room1', 'room2'];
    let calledCallbackOfNameSpace = false;
    const nameSpace = createDummyNameSpace('allRooms', err, expectedEmitData);

    getRooms(socket, nameSpace);
    expect(calledCallbackForOn).toEqual(true);
    expect(calledCallbackForEmit).toEqual(true);
    expect(receivedEventTypeFromOn).toEqual('getRooms');
    expect(receivedEventTypeFromEmit).toEqual('resultGetRooms');
    expect(receivedDataFromEmit).toEqual(expectedEmitData);
  });
});