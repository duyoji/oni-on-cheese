// fileNameWithoutExt should be filename without extension in `server/socket/Handler` directory
const commonTestForSocketHandler = (fileNameWithoutExt) => {
  const path = `../../socketHandlers/${fileNameWithoutExt}`;
  const handler = require(path)[fileNameWithoutExt];

  describe(`socket/socketHandlers/${fileNameWithoutExt}.js`, () => {
    it('should be a function.', () => {
      expect(typeof handler).toEqual('function');
    });

    it('takes 2 arguments.', () => {
      expect(handler.length).toEqual(2);
    });
  });
};

export { commonTestForSocketHandler };