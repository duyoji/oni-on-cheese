import { listen } from '../socket';

describe('server/socket.js', () => {
  it('should have `listen` function and it takes 2 arguments', () => {
    expect(typeof listen).toEqual('function');
    expect(listen.length).toEqual(2); // Check a number of arguments.
  });
});