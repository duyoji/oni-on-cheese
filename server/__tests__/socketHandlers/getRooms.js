import { getRooms } from '../../socketHandlers/getRooms';

describe('socket/socketHandlers/getRooms.js', () => {
  it('should be a function.', () => {
    expect(typeof getRooms).toEqual('function');
  });

  it('takes 2 arguments.', () => {
    expect(getRooms.length).toEqual(2);
  });
});