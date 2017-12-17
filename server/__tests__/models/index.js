import Nohm from '../../models/index';
import { getRedisClient } from '../../redis/client';

describe('server/models/index.js', () => {
  beforeAll((done) => {
    // Wait connecting to redis
    setTimeout(() => done(), 100);
  });
  afterAll(() => {
    // Need to quit to finish test completely.
    getRedisClient().quit();
  });

  it('should exist.', () => {
    expect(typeof Nohm).toEqual('function');
  });

  it('should be set client.', () => {
    expect(Nohm.client).toEqual(getRedisClient());
  });

  it('should has prefix and it is "oni-on-cheese".', () => {
    expect(/^oni-on-cheese/.test(Nohm.prefix.channel)).toEqual(true);
  });
});