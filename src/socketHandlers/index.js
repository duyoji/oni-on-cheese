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

socket.on('connection', function(){
  console.log('user connection@@@@@@@@', socket.id);
});
socket.on('disconnect', function(){
  console.log('user disconnected@@@@@@@@', socket.id);
});


export default socket;