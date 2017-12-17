import User from '../../models/User';
import redisClient from '../../redis/client';
import { Nohm } from 'nohm';

// Delete data created by this test from Redis
// after finishing this test.
// This prefix should be unique not to delete other data in Redis.
const PREFIX_FOR_TEST = 'server/__tests__/models/User';
Nohm.setPrefix(PREFIX_FOR_TEST);

describe('server/models/User.js', () => {
  beforeAll((done) => {
    // Wait connecting to redis
    setTimeout(() => done(), 1000);
  });

  afterAll(async (done) => {
    // Need to quit to finish test completely.
    redisClient.keys(`${PREFIX_FOR_TEST}*`, async (err, keys) => {
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
      const INPUT_DATA = {
        id: '999999',
        name: 'dummy name',
        icon_url: '',
        location: JSON.stringify({
          latitude: 9999,
          longitude: -9999,
        })
      };
      const createUser = async () => {
        return await User.create(INPUT_DATA);
      };
      const user = await createUser();
      expect(user.property('id')).toEqual(INPUT_DATA.id);
      expect(user.property('name')).toEqual(INPUT_DATA.name);
      expect(user.property('icon_url')).toEqual(INPUT_DATA.icon_url);
      expect(user.property('location')).toEqual(JSON.parse(INPUT_DATA.location));

      let error;
      try {
        await createUser();
      } catch (err) {
        error = err;
      }
      expect(JSON.parse(error.message).id[0]).toEqual('notUnique');
      done();
    });
  });
});