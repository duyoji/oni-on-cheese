import { leaveRoom } from '../../actions/leaveRoom';
import { getDefaultState } from '../../reducers/index';

describe('src/actions/leaveRoom.js', () => {
  it('return expected action.', () => {
    const userId = 'q0u934ruq09ja';

    expect(leaveRoom(userId)).toEqual({
      type: 'LEAVE_ROOM',
      userId
    });
  });
});