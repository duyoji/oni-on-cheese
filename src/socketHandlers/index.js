import io from 'socket.io-client';
let socket = io('https://oni-on-cheese.herokuapp.com/')

if(socket.disconnected){
  socket.disconnect();
  socket = io('http://localhost:9000/game');
}

export default socket;