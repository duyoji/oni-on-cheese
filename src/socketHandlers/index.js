import io from 'socket.io-client';
const socket = io('https://oni-on-cheese.herokuapp.com/');

export default socket;