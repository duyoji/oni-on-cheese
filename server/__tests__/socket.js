import { listen } from '../socket';
import { getRedisClient } from '../redis/client';

describe('server/socket.js', () => {
  afterAll(async (done) => {
    // Need to quit to finish test completely.
    getRedisClient().quit();
    done();
  });

  it('should have `listen` function and it takes 2 arguments', () => {
    expect(typeof listen).toEqual('function');
    expect(listen.length).toEqual(2); // Check a number of arguments.
  });
});