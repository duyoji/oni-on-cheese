import { clearUsers } from '../../actions/clearUsers';
import { getDefaultState } from '../../reducers/index';

describe('src/actions/clearUsers.js', () => {
  it('return expected action.', () => {
    const userName = 'DUMMY_USER_NAME';
    expect(clearUsers()).toEqual({
      type: 'CLEAR_USERS'
    });
  });
});