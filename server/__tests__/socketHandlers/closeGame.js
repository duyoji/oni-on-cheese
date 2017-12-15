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
    const callbackForOn = (eventType) => {
      receivedEventTypeFromOn = eventType;
    };

    const socket = createDummySocket(callbackForOn);
    socket.id = 'dummy_socket_id';

    let receivedSocketId = null;
    let receivedClose = null;
    const nameSpace = createDummyNameSpace();
    nameSpace.adapter['remoteDisconnect'] = (socketId, isClose, callback) => {
      receivedSocketId = socketId;
      receivedClose = isClose;
    };

    closeGame(socket, nameSpace);
    expect(receivedEventTypeFromOn).toEqual('closeGame');
    expect(receivedSocketId).toEqual(socket.id);
    expect(receivedClose).toEqual(true);
  });
});