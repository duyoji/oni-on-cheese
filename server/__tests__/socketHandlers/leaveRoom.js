import { leaveRoom } from '../../socketHandlers/leaveRoom';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler( leaveRoom );
describe('server/socketHandlers/leaveRoom.js', () => {
  it('calls socket.on, namespace.adapter.method and socket.emit.', () => {
    const DUMMY_ROOM_ID = 'DUMMY_ROOM_ID';

    let receivedEventTypeFromOn = '';
    const callbackForOn = (eventType, callback) => {
      receivedEventTypeFromOn = eventType;
      callback({roomId: DUMMY_ROOM_ID});
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

    nameSpace.adapter['remoteLeave'] = (socketId, roomId, callback) => {
      receivedSocketId = socketId;
      receivedRoomId = roomId;
      callback(err);
    };


    leaveRoom(socket, nameSpace);

    // socket#[on|emit] parts
    expect(receivedEventTypeFromOn).toEqual('leaveRoom');
    expect(receivedEventTypeFromEmit).toEqual('resultLeaveRoom');
    expect(receivedDataFromEmit).toEqual(`${socket.id} has left this room.`);

    // namespace.adapter#method part
    expect(receivedSocketId).toEqual(socket.id);
    expect(receivedRoomId).toEqual(DUMMY_ROOM_ID);
  });
});