import redisClient from '../../redis/client';

const PREFIX_FOR_TEST = 'test-';

xdescribe('server/redis/client.js', () => {
  beforeEach(() => {});
  afterEach((done) => {
    redisClient.keys(`${PREFIX_FOR_TEST}*`, async (err, keys) => {
      for(let i = 0; i < keys.length; i++) {
        await redisClient.delAsync(keys[i]);
      }
      done();
    });
  });

  afterAll(() => {
    // Need to quit to finish test completely.
    redisClient.quit();
  });

  it('should exist.', () => {
    expect(typeof redisClient).toEqual('object');
  });

  it('should have promisified function by bluebird', () => {
    expect(typeof redisClient.getAsync).toEqual('function');
    expect(typeof redisClient.setAsync).toEqual('function');
    expect(typeof redisClient.delAsync).toEqual('function');
  });

  it('should set, get and delete data asynchronously', async (done) => {
    const key = `${PREFIX_FOR_TEST}key`;
    const expectedValue = `${PREFIX_FOR_TEST}value`;

    // set and get
    await redisClient.setAsync(key, expectedValue);
    let fetchedValue = await redisClient.getAsync(key);
    expect(fetchedValue).toEqual(expectedValue);

    // delete
    await redisClient.delAsync(key);
    fetchedValue = await redisClient.getAsync(key);
    expect(fetchedValue).toEqual(null);

    done();
  });
});