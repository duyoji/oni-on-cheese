import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import '../styles/game-list-page.css';

class GameListPage extends Component {
  componentDidMount() {
    this.props.getRoomInfo();
  }

  render() {
    if (this.props.selectedRoomId) {
      return <Redirect to='/map' />;
    }

    return (
      <div className="gameListPage container">
        <ListGroup>
          {this.props.rooms.map(room => {
            return (
              <ListGroupItem
                key={room.roomId}
                tag="button"
                onClick={(event) => this.props.joinRoom(room.roomId)}
                action>
                {room.roomId}
                <Badge pill className="float-right">{room.numberOfPlayers}</Badge>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

GameListPage.propTypes = {
  joinRoom: PropTypes.func.isRequired,
  getRoomInfo: PropTypes.func.isRequired,
  rooms: PropTypes.array.isRequired,
  selectedRoomId: PropTypes.string
};

export default GameListPage;
