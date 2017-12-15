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
  attachBridgeMethodToEmit(socket, socket.emit);

  return socket
};

const createDummyNameSpace = (emitMethod = () => {} ) => {
  const nameSpace = {
    adapter: {}
  };
  attachBridgeMethodToEmit(nameSpace, emitMethod);

  return nameSpace
};

// Helper's helper function
const attachBridgeMethodToEmit = (socketInterface, emitMethod) => {
  const methodNamesOfBridgeToEmit = ['to', 'in'];
  methodNamesOfBridgeToEmit.forEach(methodName => {
    socketInterface[methodName] = (roomId) => {
      return {
        emit: emitMethod
      };
    };
  });
};

export {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
};