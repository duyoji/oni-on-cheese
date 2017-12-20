import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

class GameListPage extends Component {
  componentDidMount() {
    this.props.getRooms();
  }

  render() {
    return (
      <div className="gameListPage">
        <h2>GameListPage</h2>
        <ListGroup>
          {this.props.roomIds.map(roomId => {
            return (
              <ListGroupItem
                key={roomId}
                tag="button"
                onClick={(event) => this.props.joinRoom(roomId)}
                action>Room: {roomId}</ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

GameListPage.propTypes = {
  getRooms: PropTypes.func.isRequired,
  joinRoom: PropTypes.func.isRequired,
  roomIds: PropTypes.array.isRequired,
  selectedRoomId: PropTypes.string
};

export default GameListPage;
