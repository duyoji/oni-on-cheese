import { closeGame } from '../../socketHandlers/closeGame';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler( closeGame );
describe('server/socketHandlers/closeGame.js', () => {
  it('calls on and adapter method.', () => {
    let receivedEventTypeFromOn = '';
    const callbackForOn = (eventType, callback) => {
      receivedEventTypeFromOn = eventType;
      callback();
    };

    const socket = createDummySocket(callbackForOn);
    socket.id = 'dummy_socket_id';

    let receivedSocketId = null;
    let receivedClose = null;
    const nameSpace = createDummyNameSpace();
    nameSpace.adapter['remoteDisconnect'] = (socketId, isClose, callback) => {
      receivedSocketId = socketId;
      receivedClose = isClose;
      callback();
    };

    closeGame(socket, nameSpace);
    expect(receivedEventTypeFromOn).toEqual('closeGame');
    expect(receivedSocketId).toEqual(socket.id);
    expect(receivedClose).toEqual(true);
  });

  it('should emit data when error happens.', () => {
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

    const socket = createDummySocket(callbackForOn, callbackForEmit);
    const nameSpace = createDummyNameSpace();
    const err = new Error('DUMMY_ERROR');
    nameSpace.adapter['remoteDisconnect'] = (socketId, isClose, callback) => {
      callback(err);
    };

    closeGame(socket, nameSpace);
    expect(receivedEventTypeFromEmit).toEqual('resultCloseGame');
    expect(receivedDataFromEmit).toEqual({
      result: {
        error: err
      }
    });
    expect(receivedDataFromEmit.result.error.message).toEqual(err.message);
  });
});