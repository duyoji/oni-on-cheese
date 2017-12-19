import { formatOutput } from '../formatters/socketHandlerFormatter';

const EVENT_TYPES = {
  ON: 'closeGame',
  EMIT: 'resultCloseGame' // Be used only when error happen.
};

// See: ./index.js
const closeGame = (socket, socketNamespace) => {
  socket.on(EVENT_TYPES.ON, () => {
    socketNamespace.adapter.remoteDisconnect(socket.id, true, (err) => {
      if (err) {
        socket.emit(EVENT_TYPES.EMIT, formatOutput({error: err}));
      }

      // When remoteDisconnect succeed, we cannot emit any data because already disconnected.
    });
  });
};

export { closeGame };