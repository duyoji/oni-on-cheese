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
    };

    let receivedEventTypeFromEmit = '';
    let receivedDataFromEmit = null;
    const err = null;
    const expectedEmitData = ['player1', 'player2']
    const callbackForEmit = (eventType, data) => {
      receivedEventTypeFromEmit = eventType;
      receivedDataFromEmit = data;
    };

    const socket = createDummySocket(
      callbackForOn,
      callbackForEmit
    );
    const nameSpace = createDummyNameSpace();
    nameSpace.adapter['clients'] = (fn) => {
      fn(err, expectedEmitData);
    };
    
    getPlayers(socket, nameSpace);
    expect(receivedEventTypeFromOn).toEqual('getPlayers');
    expect(receivedEventTypeFromEmit).toEqual('resultGetPlayers');
    expect(receivedDataFromEmit).toEqual({result: {
      data: expectedEmitData
    }})
  });

  it('should handle err if there is', () => {
    let receivedEventTypeFromOn = '';
    const callbackForOn = (eventType, callback) => {
      receivedEventTypeFromOn = eventType;
      callback();
    };

    let receivedEventTypeFromEmit = '';
    let receivedDataFromEmit = null;
    const err = new Error('DUMMY_ERROR');
    const expectedEmitData = undefined;
    const callbackForEmit = (eventType, data) => {
      receivedEventTypeFromEmit = eventType;
      receivedDataFromEmit = data;
    };

    const socket = createDummySocket(
      callbackForOn,
      callbackForEmit
    );
    const nameSpace = createDummyNameSpace();
    nameSpace.adapter['clients'] = (fn) => {
      fn(err, expectedEmitData);
    };
    
    getPlayers(socket, nameSpace);
    expect(receivedEventTypeFromOn).toEqual('getPlayers');
    expect(receivedEventTypeFromEmit).toEqual('resultGetPlayers');
    expect(receivedDataFromEmit).toEqual({result: {
      error: err
    }});
  });
});