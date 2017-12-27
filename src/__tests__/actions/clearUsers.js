import { clearUsers } from '../../actions/clearUsers';

describe('src/actions/clearUsers.js', () => {
  it('return expected action.', () => {
    expect(clearUsers()).toEqual({
      type: 'CLEAR_USERS'
    });
  });
});