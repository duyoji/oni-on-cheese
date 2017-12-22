import { connect } from 'react-redux';
import MapPage  from '../components/MapPage';
import { updateLocation } from '../actions/updateLocation';

let receiveCounter = 0;
const mapStateToProps = state => {
  receiveCounter++;
  return {
    roomId: state.roomId,
    users: state.users,

    // For debugger
    receiveCounter
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateCurrentLocation: (user) => {
      dispatch( updateLocation(user) );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPage);