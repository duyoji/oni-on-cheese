import { connect } from 'react-redux';
import MapPage  from '../components/MapPage';
import { updateLocation } from '../actions/updateLocation';

const mapStateToProps = state => {
  return {
    roomId: state.roomId,
    users: state.users
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