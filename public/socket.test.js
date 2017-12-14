let selectedRoom = null;

const getRoomsButton = document.querySelector('#getRooms');
const createRoomButton = document.querySelector('#createRoom');
const joinRoomButton = document.querySelector('#joinRoom');
const leaveRoomButton = document.querySelector('#leaveRoom');
const updateLocationButton = document.querySelector('#updateLocation');
const closeGameButton = document.querySelector('#closeGame');
const roomSelector = document.querySelector('#roomSelector');

roomSelector.addEventListener('change', (e) => {
  selectedRoom = e.target.value;
  console.log('selectedRoom: ', selectedRoom);
});

const updateRoomsSelector = (newRooms) => {
  while(roomSelector.children.length > 0) {
    const child = roomSelector.children[0];
    roomSelector.removeChild(child);
  }
  newRooms.forEach((room) => {
    const option = document.createElement('option');
    option.value = room;
    option.innerHTML = room;
    roomSelector.appendChild(option);
  });
};


const socket = io('localhost:8888/game');
socket.on('connect', function(){
  console.log('io: connect in client');
});
socket.on('gameRooms', function(rooms){
  console.log('io: gameRooms in client', rooms);
  updateRoomsSelector(rooms);
});
socket.on('createRoom', function(data){
  console.log('io: createRoom in client', data);
});
socket.on('joinRoom', function(data){
  console.log('io: joinRoom in client', data);
});
socket.on('leaveRoom', function(data){
  console.log('io: leaveRoom in client', data);
});
socket.on('closeGame', function(){
  console.log('io: closeGame in client');
});
socket.on('disconnect', function(){
  console.log('io: disconnect in client');
});


getRoomsButton.addEventListener('click', (e) => {
  socket.emit('getRooms');
});

createRoomButton.addEventListener('click', (e) => {
  socket.emit('createRoom');
});

joinRoomButton.addEventListener('click', (e) => {
  if(!selectedRoom) {
    alert('Select room first!');
    return;
  }
  socket.emit('joinRoom', {roomId: selectedRoom});
});

leaveRoomButton.addEventListener('click', (e) => {
  if(!selectedRoom) {
    alert('Select room first!');
    return;
  }
  socket.emit('leaveRoom', {roomId: selectedRoom});
});


closeGameButton.addEventListener('click', (e) => {
  socket.emit('closeGame');
});