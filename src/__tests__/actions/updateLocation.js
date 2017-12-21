import { updateLocation } from '../../actions/updateLocation';
import { getDefaultState } from '../../reducers/index';

describe('src//actions/updateLocation.js', () => {
  it('return expected action.', () => {
    const USER = {
      id: 'oeiwqjfksadlkf',
      name: 'kdjf@oijiwqj',
      iconUrl: 'https://oiiooijdfas.com/joas.png',
      location: {latitude: 12345, longitude: 5321}
    };

    expect(updateLocation(USER)).toEqual({
      type: 'UPDATE_LOCATION',
      user: USER
    });
  });
});