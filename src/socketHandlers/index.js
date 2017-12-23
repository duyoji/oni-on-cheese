import io from 'socket.io-client';
const NAME_SPACE = 'game';

let socket;

// Set proper url according to running machine
if(window.location.port === '3000') {
  // Local PC
  socket = io(`${window.location.hostname}:9000/${NAME_SPACE}`);
} else {
  // Heroku
  socket = io(`${window.location.host}/${NAME_SPACE}`);
}

export default socket;