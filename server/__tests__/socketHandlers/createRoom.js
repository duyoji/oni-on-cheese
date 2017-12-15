import { createRoom } from '../../socketHandlers/createRoom';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler( createRoom );
describe('server/socketHandlers/createRoom.js', () => {
  it('calls socket.on, namespace.adapter.method and socket.emit.', () => {
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
    const nameSpace = createDummyNameSpace();

    let receivedSocketId = null;
    let receivedRoomId = null;

    nameSpace.adapter['remoteJoin'] = (socketId, roomId, callback) => {
      receivedSocketId = socketId;
      receivedRoomId = socketId;
      callback(err);
    };


    createRoom(socket, nameSpace);

    // socket#[on|emit] parts
    expect(receivedEventTypeFromOn).toEqual('createRoom');
    expect(receivedEventTypeFromEmit).toEqual('resultCreateRoom');
    expect(receivedDataFromEmit).toEqual('success');

    // namespace.adapter#method part
    expect(receivedSocketId).toEqual(socket.id);
    expect(receivedRoomId).toEqual(socket.id);
  });
});