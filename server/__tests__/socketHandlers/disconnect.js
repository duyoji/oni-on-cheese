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
    const callbackForOn = (eventType, callback) => {
      receivedEventTypeFromOn = eventType;
      callback();
    };

    let receivedEventTypeFromEmit;
    let receivedDataFromEmit;
    const callbackForEmit = (eventType, data) => {
      receivedEventTypeFromEmit = eventType;
      receivedDataFromEmit = data;
    };

    const socket = createDummySocket(callbackForOn);
    const nameSpace = createDummyNameSpace(callbackForEmit);
    nameSpace.adapter.rooms = {
      'roomId1': {},
      'roomId2': {}
    };

    disconnect(socket, nameSpace);

    // socket#[on|emit] parts
    expect(receivedEventTypeFromOn).toEqual('disconnect');
    expect(receivedEventTypeFromEmit).toEqual('resultLeaveRoom');
    expect(receivedDataFromEmit.result.data).toEqual({userId: socket.id});
  });
});