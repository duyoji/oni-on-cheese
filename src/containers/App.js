import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    currentView: state.currentView
  }
};
const mapDispatchToProps = dispatch => ({});

// https://github.com/ReactTraining/react-router/issues/3536#issuecomment-225586661
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(App);