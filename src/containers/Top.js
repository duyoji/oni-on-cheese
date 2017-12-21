import { connect } from 'react-redux';
import TopPage from '../components/TopPage';
import { createGame } from '../actions/createGame';

const mapStateToProps = (state) => {
  return {
    roomId: state.roomId 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGame: () => {
      dispatch(createGame());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopPage);