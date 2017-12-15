import User from '../../models/User';
import redisClient from '../../redis/client';

describe('server/models/User.js', () => {
  afterAll(() => {
    // Need to quit to finish test completely.
    redisClient.quit();
  });

  it('should exist.', () => {
    expect(typeof User).toEqual('function');
    const user = new User();
    user.p('name', 'test');
    console.log(user);
  });

  xit('should create a user.', () => {

  });

  xit('should be set client.', () => {
    expect(Nohm.client).toEqual(redisClient);
  });

  xit('should has prefix and it is "oni-on-cheese".', () => {
    expect(/^oni-on-cheese/.test(Nohm.prefix.channel)).toEqual(true);
  });
});