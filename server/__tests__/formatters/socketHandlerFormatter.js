import {formatInput, formatOutput} from '../../formatters/socketHandlerFormatter';

describe('server/formatters/socketHandlerFormatter', () => {
  describe('formatInput', () => {
    it('should be a function', () => {
      expect(typeof formatInput).toEqual('function');
    });
  });

  describe('formatOutput', () => {
    it('should be a function', () => {
      expect(typeof formatOutput).toEqual('function');
    });
  });
});