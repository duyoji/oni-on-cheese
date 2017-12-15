import { disconnect } from '../../socketHandlers/disconnect';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler( disconnect );
describe('server/socketHandlers/disconnect.js', () => {
  it('calls socket.on.', () => {
    let receivedEventTypeFromOn = '';
    const callbackForOn = (eventType) => {
      receivedEventTypeFromOn = eventType;
    };

    const socket = createDummySocket(callbackForOn);
    const nameSpace = createDummyNameSpace();

    disconnect(socket, nameSpace);

    // socket#[on|emit] parts
    expect(receivedEventTypeFromOn).toEqual('disconnect');
  });
});