import { getPlayersPromise } from '../../../actions/helpers/getPlayersHelper'
import socket from '../../socketHandlers/index'

describe('src/__tests__/actions/helpers/getPlayersHelper.js', () => {
  afterAll(() => {
    socket.disconnect();
  });
  it('should return promise object', () => {
    const promise = getPlayersPromise();
    expect(promise instanceof Promise).toEqual(true);
  });
});