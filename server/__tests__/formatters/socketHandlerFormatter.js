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

    it('throws an error when both props of `error` and `data` are passed or both are not passed to the function.', () => {
      expect(() => {
        formatOutput();
      }).toThrowError('Need an error or data prop.');
      expect(() => {
        formatOutput({error: new Error(), data: 1});
      }).toThrowError('Cannot pass both error and data props.');
    });

    it('should include result that includes error and data props', () => {
      const formattedData = formatOutput({data:1});
      expect(formattedData.hasOwnProperty('result')).toEqual(true);
      expect(formattedData.result.hasOwnProperty('error')).toEqual(true);
      expect(formattedData.result.hasOwnProperty('data')).toEqual(true);
    });

    it('should return same error.', () => {
      const error = new Error();
      const formattedData = formatOutput({error});
      expect(formattedData.result.error).toEqual(error);
    });

    it('should return same data.', () => {
      const data = {data:[1,2,3,'abc']};
      const formattedData = formatOutput({data});
      expect(formattedData.result.data).toEqual(data);
    });
  });
});