import fontawesome from 'fontawesome-markers';
import { createUserIcon } from '../../utils/icon';

describe('utils/icon.js', () => {
  describe('The createUserIcon function', () => {
    it('returns red icon when an argument, isMe, is true.', () => {
      const isMe = true;
      const icon = createUserIcon(isMe);
      expect(fontawesome.MAP_MARKER).toEqual(icon.path);
      expect('#F44362').toEqual(icon.fillColor);
    });

    it('returns yellow icon when an argument, isMe, is false.', () => {
      const isMe = false;
      const icon = createUserIcon(isMe);
      const iconWithArgument = createUserIcon();
      expect(fontawesome.MAP_MARKER).toEqual(icon.path);
      expect(fontawesome.MAP_MARKER).toEqual(iconWithArgument.path);
      expect('#FD9E6C').toEqual(icon.fillColor);
      expect('#FD9E6C').toEqual(iconWithArgument.fillColor);
    });
  });
});