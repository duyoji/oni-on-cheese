import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import '../styles/game-list-page.css';

class GameListPage extends Component {
  componentDidMount() {
    this.props.getRooms();
  }
// add number of players in gamelist section
  render() {
    if (this.props.selectedRoomId) {
      return <Redirect to='/map' />;
    }

    return (
      <div className="gameListPage container">
        <ListGroup>
          {this.props.roomIds.map(roomId => {
            return (
              <ListGroupItem
                key={roomId}
                tag="button"
                onClick={(event) => this.props.joinRoom(roomId)}
                action>
                {roomId}
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
  roomIds: PropTypes.array.isRequired,
  selectedRoomId: PropTypes.string
};

export default GameListPage;
