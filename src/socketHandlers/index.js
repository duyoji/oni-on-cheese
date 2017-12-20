import io from 'socket.io-client';
// const socket = io('https://oni-on-cheese.herokuapp.com/');
const socket = io('http://localhost:9000/games');

export default socket;