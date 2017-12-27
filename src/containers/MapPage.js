import { connect } from 'react-redux';
import MapPage  from '../components/MapPage';
import { updateLocation } from '../actions/updateLocation';
import { leaveRoom } from '../actions/leaveRoom';
import { joinRoom } from '../actions/joinRoom';
import { clearUsers } from '../actions/clearUsers';
import { connectedToSocket } from '../actions/connectedToSocket';

let updateLocationCounter = 0; // For debugger
const mapStateToProps = state => {
  return {
    roomId: state.roomId,
    users: state.users,
    socketId: state.socketId,
    userName: state.userName,

    // For debugger
    updateLocationCounter
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateCurrentLocation: (user) => {
      updateLocationCounter++; // For debugger
      dispatch( updateLocation(user) );
    },
    leaveUserFromRoom: (userId) => {
      dispatch( leaveRoom(userId) );
    },
    reconnectedToSocket: (newUserId) => {
      dispatch( clearUsers() );
      dispatch( connectedToSocket(newUserId) );
    },
    rejoinRoom: (roomId) => {
      dispatch( joinRoom(roomId) );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPage);