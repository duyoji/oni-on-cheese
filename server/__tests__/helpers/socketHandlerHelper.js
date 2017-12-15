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

const createDummySocket = (callbackForOn, callbackForEmit) => {
  const socket = {
    on: (eventType, callback) => {
      if (callbackForOn) {
        callbackForOn(eventType, callback);
      }
    },
    emit: (eventType, data) => {
      if(callbackForEmit) {
        callbackForEmit(eventType, data);
      }
    },
    id: 'DUMMY_SOCKET_ID'
  };
  socket['to'] = (roomId) => {
    return {
      emit: socket.emit
    };
  };

  return socket
};

const createDummyNameSpace = () => {
  const nameSpace = {
    adapter: {}
  };

  return nameSpace
};

export {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
};