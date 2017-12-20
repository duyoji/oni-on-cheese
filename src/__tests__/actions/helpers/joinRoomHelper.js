import { joinRoomPromise } from '../../../actions/helpers/joinRoomHelper';
import socket from '../../socketHandlers/index';
import { expectation } from 'sinon';

describe('src/__tests__/actions/helpers/joinRoomHelper.js', () => {
  afterAll(() => {
    socket.disconnect();
  });

  it('should return Promise object.', () => {
    const roomId = 'dfjaq40q9u09u9q@09';
    const promise = joinRoomPromise(roomId);
    expect(promise instanceof Promise).toEqual(true);
  });
});