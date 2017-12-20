import { connect } from 'react-redux';
import Top from '../components/Top';
import { createGame } from '../actions';

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
)(Top);