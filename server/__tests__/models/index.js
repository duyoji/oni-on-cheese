import Nohm from '../../models/index';
import redisClient from '../../redis/client';

describe('server/models/index.js', () => {
  afterAll(() => {
    // Need to quit to finish test completely.
    redisClient.quit();
  });

  it('should exist.', () => {
    expect(typeof Nohm).toEqual('function');
  });

  it('should be set client.', () => {
    expect(Nohm.client).toEqual(redisClient);
  });

  it('should has prefix and it is "oni-on-cheese".', () => {
    expect(/^oni-on-cheese/.test(Nohm.prefix.channel)).toEqual(true);
  });
});