import server from '../server';

describe('server/server.js', () => {
  it('should have `listen` method', () => {
    expect(typeof server.listen).toEqual('function');
  });
});