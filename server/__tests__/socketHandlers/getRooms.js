import server from '../../socket/getRooms';

describe('socket/getRooms.js', () => {
  it('should have `listen` method', () => {
    expect(typeof server.listen).toEqual('function');
  });
});