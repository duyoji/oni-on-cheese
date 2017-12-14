// fileNameWithoutExt should be filename without extension in `server/socket/Handler` directory
const commonTestForSocketHandler = (fileNameWithoutExt) => {
  const path = `../../socketHandlers/${fileNameWithoutExt}`;
  const handler = require(path)[fileNameWithoutExt];

  describe(`Common test of socketHandlers`, () => {
    it('should be a function.', () => {
      expect(typeof handler).toEqual('function');
    });

    it('takes 2 arguments.', () => {
      expect(handler.length).toEqual(2);
    });
  });
};

const createDummySocket = (eventType, callbackForOn, callbackForEmit) => {
  const socket = {
    on: (eventType, callback) => {
      callbackForOn();
      callback();
    },
    emit: (eventType, data) => {
      callbackForEmit(eventType, data);
    }
  };

  return socket
};

const createDummyNameSpace = (adapterMethodName, callback) => {
  const nameSpace = {
    adapter: {}
  };
  nameSpace.adapter[adapterMethodName] = () => {
    callback();
  };

  return nameSpace
};

export {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
};