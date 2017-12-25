import { setUserName } from '../../actions/setUserName';
import { getDefaultState } from '../../reducers/index';

describe('src/actions/setUserName.js', () => {
  it('return expected action.', () => {
    const userName = 'DUMMY_USER_NAME';
    expect(setUserName(userName)).toEqual({
      type: 'SET_USER_NAME',
      userName
    });
  });
});