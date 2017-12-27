import { connect } from 'react-redux';
import InputUserNameModal from '../../components/modals/InputUserNameModal';
import { setUserName } from '../../actions/setUserName';

const mapStateToProps = state => {
  return {
    userName: state.userName || '',
  };
};

const mapDispatchToProps = dispatch => ({
  setUserName: (userName) => {
    dispatch( setUserName(userName) );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputUserNameModal);