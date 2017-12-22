import { getPlayers } from '../../socketHandlers/getPlayers';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler( getPlayers );
describe('server/socketHanlders/getPlayers.js', () => {
  it('calls on, adapter method and emit', () => {    
    let receivedEventTypeFromOn = '';
    const callbackForOn = (eventType, callback) => {
      receivedEventTypeFromOn = eventType;
      callback();
    }

    let receivedEventTypeFromEmit = '';
    const callbackForEmit = (eventType, data) => {
      receivedEventTypeFromEmit = envetType;
      receivedDataFromEmit = data;
    }

    const socket = createDummySocket(
      callbackForOn,
      callbackForEmit
    );
    const nameSpace = createDummyNameSpace();
    
    getPlayers(socket, nameSpace);
    expect(receivedEventTypeFromOn).toEqual('getPlayers')
  });
});