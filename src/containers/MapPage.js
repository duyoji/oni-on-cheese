import { connect } from 'react-redux';
import MapPage  from '../components/MapPage';
import { updateLocation } from '../actions/updateLocation';
import { leaveRoom } from '../actions/leaveRoom';

let receiveCounter = 0;
const mapStateToProps = state => {
  receiveCounter++;
  return {
    roomId: state.roomId,
    users: state.users,
    socketId: state.socketId,

    // For debugger
    receiveCounter
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateCurrentLocation: (user) => {
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