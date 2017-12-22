import { connect } from 'react-redux';
import MapPage  from '../components/MapPage';
const mapStateToProps = state => {
  return {
    users: [
      { id: 1, location: { latitude: 35.6641, longitude: 139.7294 } },
      { id: 2, location: { latitude: 35.6621, longitude: 139.7254 } },
      { id: 3, location: { latitude: 35.6631, longitude: 139.7264 } },
    ]
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPage);