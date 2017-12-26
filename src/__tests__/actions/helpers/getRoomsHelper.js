import { getRoomIdsPromise } from '../../../actions/helpers/getRoomsHelper';
import socket from '../../socketHandlers/index';

describe('src/__tests__/actions/helpers/joinRoomHelper.js', () => {
  afterAll(() => {
    socket.disconnect();
  });

  it('should return Promise object.', () => {
    const promise = getRoomIdsPromise();
    expect(promise instanceof Promise).toEqual(true);
  });
});