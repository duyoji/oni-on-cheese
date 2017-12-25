import { connect } from 'react-redux';
import App from '../components/App';
import { connectedToSocket } from '../actions/connectedToSocket';

const mapDispatchToProps = dispatch => ({
  connectedToSocket: (socketId) => {
    dispatch( connectedToSocket(socketId) );
  }
});

// https://github.com/ReactTraining/react-router/issues/3536#issuecomment-225586661
export default connect(
  null,
  mapDispatchToProps,
  null,
  { pure: false }
)(App);