import { updateRoom } from '../../actions/updateRoom';

describe('src//actions/updateRoom.js', () => {
  it('return expected action.', () => {
    const room = {
      roomId: 'room1',
      numberOfPlayers: 5,
    };

    expect(updateRoom(room)).toEqual({
      type: 'UPDATE_ROOM',
      room
    });
  });
});