import { getRooms } from '../../socketHandlers/getRooms';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler('getRooms');
describe('server/socketHandlers/getRooms.js', () => {

  const EVENT_TYPE = 'getRooms';
  const EMIT_DATA = 'DUMMY_DATA';

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
      EVENT_TYPE,
      callbackForOn,
      callbackForEmit // called in namespace.adapter method.
    );

    let calledCallbackOfNameSpace = false;
    const nameSpace = createDummyNameSpace('allRooms', () => {
      calledCallbackOfNameSpace = true;
      socket.emit(EVENT_TYPE, EMIT_DATA);
    });

    getRooms(socket, nameSpace);
    expect(calledCallbackForOn).toEqual(true);
    expect(calledCallbackForEmit).toEqual(true);
    expect(calledCallbackOfNameSpace).toEqual(true);
    expect(receivedEventTypeFromOn).toEqual(EVENT_TYPE);
    expect(receivedEventTypeFromEmit).toEqual(EVENT_TYPE);
    expect(receivedDataFromEmit).toEqual(EMIT_DATA);
  });
});