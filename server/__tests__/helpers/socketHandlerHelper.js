// `handler` should be in `server/socket/Handler`
const commonTestForSocketHandler = (handler) => {
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
      callbackForOn(eventType);
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
  nameSpace.adapter[adapterMethodName] = (eventType, data) => {
    callback(eventType, data);
  };

  return nameSpace
};

export {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
};