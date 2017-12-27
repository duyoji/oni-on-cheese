import { connectedToSocket } from '../../actions/connectedToSocket';

describe('src/actions/connectedToSocket.js', () => {
  it('return expected action.', () => {
    const socketId = '/foadsjf@oaje';
    expect(connectedToSocket(socketId)).toEqual({
      type: 'CONNECTED_TO_SOCKET',
      socketId
    });
  });
});