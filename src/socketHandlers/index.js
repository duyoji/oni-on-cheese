import io from 'socket.io-client';
const socket = io('localhost:9000/game');

export default socket;