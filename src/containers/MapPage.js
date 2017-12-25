import { connect } from 'react-redux';
import MapPage  from '../components/MapPage';
import { updateLocation } from '../actions/updateLocation';
import { leaveRoom } from '../actions/leaveRoom';

let updateLocationCounter = 0; // For debugger
const mapStateToProps = state => {
  return {
    roomId: state.roomId,
    users: state.users,
    socketId: state.socketId,

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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPage);