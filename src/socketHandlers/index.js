import io from 'socket.io-client';
const NAME_SPACE = '/game';

let socket;

// Set proper url according to running machine
if(window.location.host === 'localhost:3000') {
  // Local PC
  socket = io(`localhost:9000/${NAME_SPACE}`);
} else {
  // Heroku
  socket = io(NAME_SPACE);
}

export default socket;