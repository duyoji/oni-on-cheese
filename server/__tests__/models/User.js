import User from '../../models/User';
import { getRedisClient } from '../../redis/client';
import { Nohm } from 'nohm';

// Delete data created by this test from Redis
// after finishing this test.
// This prefix should be unique not to delete other data in Redis.
const PREFIX_FOR_TEST = 'server/__tests__/models/User';
Nohm.setPrefix(PREFIX_FOR_TEST);

const USER_ID_FOR_TEST = '99999';

describe('server/models/User.js', () => {
  beforeAll((done) => {
    // Wait connecting to redis
    setTimeout(() => done(), 100);
  });

  afterAll(async (done) => {
    // Need to quit to finish test completely.
    getRedisClient().keys(`${PREFIX_FOR_TEST}*`, async (err, keys) => {
      for(let i = 0; i < keys.length; i++) {
        await getRedisClient().delAsync(keys[i]);
      }
      getRedisClient().quit();
      done();
    });
  });

  it('should exist.', () => {
    expect(typeof User).toEqual('function');
  });

  describe('Class methods', () => {
    const INPUT_DATA = {
      id: USER_ID_FOR_TEST,
      name: 'dummy name',
      iconUrl: '',
      location: JSON.stringify({
        latitude: 9999,
        longitude: -9999,
      })
    };

    describe('The `create` method', () => {
      it('should return user instance and store data in redis. ', async (done) => {
        const createUser = async () => {
          return await User.create(INPUT_DATA);
        };
        const user = await createUser();
        expect(user.property('id')).toEqual(USER_ID_FOR_TEST);
        expect(user.property('name')).toEqual(INPUT_DATA.name);
        expect(user.property('iconUrl')).toEqual(INPUT_DATA.iconUrl);
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

    describe('The `findById` method', () => {
      it('should return stored data from Redis. ', async (done) => {
        const user = await User.findById(USER_ID_FOR_TEST);
        expect(user.property('id')).toEqual(USER_ID_FOR_TEST);
        expect(user.property('name')).toEqual(INPUT_DATA.name);
        expect(user.property('iconUrl')).toEqual(INPUT_DATA.iconUrl);
        expect(user.property('location')).toEqual(JSON.parse(INPUT_DATA.location));

        let error;
        try {
          await User.findById('UNREGISTERED_USER');
        } catch (err) {
          error = err;
        }
        expect(error.message).toEqual('not found');
        done();
      });
    });

    describe('The `updateLocationById` method', () => {
      it('should update location of specific user.', async (done) => {
        const newLocation = JSON.stringify({
          latitude: 10000,
          longitude: -10000,
        });

        const user = await User.updateLocationById(USER_ID_FOR_TEST, newLocation);
        expect(user.property('id')).toEqual(USER_ID_FOR_TEST);
        expect(user.property('name')).toEqual(INPUT_DATA.name);
        expect(user.property('iconUrl')).toEqual(INPUT_DATA.iconUrl);
        expect(user.property('location')).toEqual(JSON.parse(newLocation));

        let error;
        const invalidLocationData = 1;
        try {
          await User.updateLocationById(USER_ID_FOR_TEST, invalidLocationData);
        } catch (err) {
          error = err;
        }
        expect(JSON.parse(error.message).location[0]).toEqual('custom_location');
        done();

        done();
      });
    });
  });

  describe('Instance methods', () => {
    describe('The `serialize` method', () => {
      it('should return stored data from Redis. ', async (done) => {
        const user = await User.findById(USER_ID_FOR_TEST);
        expect(user.serialize()).toEqual({
          id: user.property('id'),
          name: user.property('name'),
          iconUrl: user.property('iconUrl'),
          location: user.property('location'),
        });

        done();
      });
    });
  });
});