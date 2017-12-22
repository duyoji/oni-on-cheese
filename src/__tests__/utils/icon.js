import fontawesome from 'fontawesome-markers';
import { createUserIcon } from '../../utils/icon';

describe('utils/icon.js', () => {
  it('createUserIcon', () => {
    const defaultIcon = createUserIcon();
    expect(fontawesome.MAP_MARKER).toEqual(defaultIcon.path);
  });
});