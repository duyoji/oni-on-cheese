import { connect } from 'react-redux';
import GameListPage from '../components/GameListPage';
import { getRooms } from '../actions/getRooms';
import { joinRoom } from '../actions/joinRoom';
import { getPlayers } from '../actions/getPlayers'

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
  },
  getPlayers: (rooms) => {
    dispatch( getPlayers(rooms) );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameListPage);