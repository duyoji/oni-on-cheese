import { getRooms } from '../../socketHandlers/getRooms';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler('getRooms');
describe('server/socketHandlers/getRooms.js', () => {
  it('calls on, adter method and emit.', () => {
    let calledCallbackForOn = false;
    let calledCallbackForEmit = false;
    const callbackForOn = () => calledCallbackForOn = true;
    const callbackForEmit = () => calledCallbackForEmit = true;

    const socket = createDummySocket(
      'getRooms',
      callbackForOn,
      callbackForEmit // called in namespace.adapter method.
    );

    let calledCallbackOfNameSpace = false;
    const nameSpace = createDummyNameSpace('allRooms', () => {
      calledCallbackOfNameSpace = true;
      socket.emit();
    });

    getRooms(socket, nameSpace);
    expect(calledCallbackForOn).toEqual(true);
    expect(calledCallbackForEmit).toEqual(true);
    expect(calledCallbackOfNameSpace).toEqual(true);
  });
});