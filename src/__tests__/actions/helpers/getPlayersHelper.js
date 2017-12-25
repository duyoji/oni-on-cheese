import { getPlayersPromise } from '../../../actions/helpers/getPlayersHelper'
import socket from '../../socketHandlers/index'

describe('src/__tests__/actions/helpers/getPlayersHelper.js', () => {
  afterAll(() => {
    socket.disconnect();
  });
  it('should return promise object', () => {
    const rooms = [
      { roomId: 'room1', numberOfPlayers: null },
      { roomId: 'room2', numberOfPlayers: null },
      { roomId: 'room3', numberOfPlayers: null }
    ];
    const promise = getPlayersPromise(rooms);
    expect(promise[0] instanceof Promise).toEqual(true);
  });
});