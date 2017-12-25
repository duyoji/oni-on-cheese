import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import '../styles/game-list-page.css';

class GameListPage extends Component {
  componentDidMount() {
    this.props.getRooms();
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
                onClick={(event) => this.props.joinRoom(roomId)}
                action>
                {room.roomId}
                <Badge pill className="float-right">0</Badge>
              </ListGroupItem>
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
  rooms: PropTypes.array.isRequired,
  selectedRoomId: PropTypes.string
};

export default GameListPage;
