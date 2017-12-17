import { getRedisClient } from '../../redis/client';

const PREFIX_FOR_TEST = 'test-';

describe('server/redis/client.js', () => {
  beforeAll((done) => {
    // Wait connecting to redis
    setTimeout(() => done(), 100);
  });
  afterEach((done) => {
    getRedisClient().keys(`${PREFIX_FOR_TEST}*`, async (err, keys) => {
      for(let i = 0; i < keys.length; i++) {
        await getRedisClient().delAsync(keys[i]);
      }
      done();
    });
  });

  afterAll(() => {
    // Need to quit to finish test completely.
    getRedisClient().quit();
  });

  it('should exist.', () => {
    expect(typeof getRedisClient()).toEqual('object');
  });

  it('should have promisified function by bluebird', () => {
    expect(typeof getRedisClient().getAsync).toEqual('function');
    expect(typeof getRedisClient().setAsync).toEqual('function');
    expect(typeof getRedisClient().delAsync).toEqual('function');
  });

  it('should set, get and delete data asynchronously', async (done) => {
    const key = `${PREFIX_FOR_TEST}key`;
    const expectedValue = `${PREFIX_FOR_TEST}value`;

    // set and get
    await getRedisClient().setAsync(key, expectedValue);
    let fetchedValue = await getRedisClient().getAsync(key);
    expect(fetchedValue).toEqual(expectedValue);

    // delete
    await getRedisClient().delAsync(key);
    fetchedValue = await getRedisClient().getAsync(key);
    expect(fetchedValue).toEqual(null);

    done();
  });
});