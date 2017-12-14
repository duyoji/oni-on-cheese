import server from '../server';

xdescribe('server/server.js', () => {
  it('should have `listen` method', () => {
    expect(typeof server.listen).toEqual('function');
  });
});