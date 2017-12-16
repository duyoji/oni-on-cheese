import User from '../../models/User';
import redisClient from '../../redis/client';

const PREFIX_FOR_TEST = 'test-oni-on-cheese';

describe('server/models/User.js', () => {
  beforeAll((done) => {
    // Wait connecting to redis
    setTimeout(() => done(), 1000);
  });

  afterAll(async () => {
    // Need to quit to finish test completely.
    redisClient.keys('oni-on-cheese*', async (err, keys) => {
      for(let i = 0; i < keys.length; i++) {
        await redisClient.delAsync(keys[i]);
      }
      redisClient.quit();
      done();
    });
  });

  it('should exist.', () => {
    expect(typeof User).toEqual('function');
  });

  describe('class methods', () => {
    it('should have create method (a class method). ', () => {
      expect(typeof User.create).toEqual('function');
    });

    it('should return user instance and store data in redis. ', async (done) => {
      const user = await User.create({
        id: '999999',
        name: 'dummy name',
        icon_url: '',
        location: JSON.stringify({
          latitude: 9999,
          longitude: -9999,
        })
      });

      done();
    });
  });


  it('should have create method (a class method). ', () => {
    expect(typeof User.create).toEqual('function');
  });

  xit('should be set client.', () => {
    expect(Nohm.client).toEqual(redisClient);
  });

  xit('should has prefix and it is "oni-on-cheese".', () => {
    expect(/^oni-on-cheese/.test(Nohm.prefix.channel)).toEqual(true);
  });
});