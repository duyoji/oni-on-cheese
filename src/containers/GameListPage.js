import { connect } from 'react-redux';
import GameListPage from '../components/GameListPage';
import { joinRoom } from '../actions/joinRoom';
import { getRoomInfo } from '../actions/getRoomInfo';


const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    selectedRoomId: state.roomId
  };
};
const mapDispatchToProps = dispatch => ({
  joinRoom: (roomId) => {
    dispatch( joinRoom(roomId) );
  },
  getRoomInfo: () => {
    dispatch( getRoomInfo() );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameListPage);