import { connect } from 'react-redux';
import GameListPage from '../components/GameListPage';
import { getRooms } from '../actions/getRooms';
import { joinRoom } from '../actions/joinRoom';

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    selectedRoomId: state.roomId
  }
};
const mapDispatchToProps = dispatch => ({
  getRooms: () => {
    dispatch(getRooms());
  },
  joinRoom: (roomId) => {
    dispatch( joinRoom(roomId) );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameListPage);