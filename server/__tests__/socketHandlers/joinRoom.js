import { joinRoom } from '../../socketHandlers/joinRoom';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler( joinRoom );
describe('server/socketHandlers/joinRoom.js', () => {
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

    nameSpace.adapter['remoteJoin'] = (socketId, roomId, callback) => {
      receivedSocketId = socketId;
      receivedRoomId = roomId;
      callback(err);
    };


    joinRoom(socket, nameSpace);

    // socket#[on|emit] parts
    expect(receivedEventTypeFromOn).toEqual('joinRoom');
    expect(receivedEventTypeFromEmit).toEqual('resultJoinRoom');
    expect(receivedDataFromEmit).toEqual({
      result: {
        data: `${socket.id} has joined this room.`
      }
    });

    // namespace.adapter#method part
    expect(receivedSocketId).toEqual(socket.id);
    expect(receivedRoomId).toEqual(DUMMY_ROOM_ID);
  });

  it('calls socket.on, namespace.adapter.method and socket.emit.', () => {
    const DUMMY_ROOM_ID = 'DUMMY_ROOM_ID';
    const callbackForOn = (eventType, callback) => {
      callback({roomId: DUMMY_ROOM_ID});
    };
    let receivedDataFromEmit = null;
    const callbackForEmit = (eventType, data) => {
      receivedDataFromEmit = data;
    };

    const socket = createDummySocket(
      callbackForOn,
      callbackForEmit // called in namespace.adapter method.
    );

    const err = new Error('DUMMY_ERROR');
    const nameSpace = createDummyNameSpace();
    nameSpace.adapter['remoteJoin'] = (socketId, roomId, callback) => {
      callback(err);
    };

    joinRoom(socket, nameSpace);
    expect(receivedDataFromEmit).toEqual({
      result: {
        error: err
      }
    });
  });
});