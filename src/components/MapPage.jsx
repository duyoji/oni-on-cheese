import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { getCurrentPosition, watchPosition } from '../utils/location';
import { emit, addHandlerListener as addUpdateLocationHandler } from '../socketHandlers/updateLocation';
import { addHandlerListener as addLeaveRoomHandler } from '../socketHandlers/leaveRoom';
import { createUserIcon } from '../utils/icon';
import { Redirect } from 'react-router-dom';

const GameMap = withGoogleMap(props => {
  const renderSelectedMarkerInfo = (user) => {
    return (
      <InfoWindow onCloseClick={props.onCloseInfoWindow}>
        <div>
          {user.name}
        </div>
      </InfoWindow>
    );
  };

  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={10}
      defaultCenter={{ lat: 35.669107, lng: 139.6009514 }}
      onClick={(event) => {
        event.stop();
        props.onMapClick()
      }}
    >
      {props.users.map(user => {
        const isMe = props.socketId === user.id;
        return(
          <Marker
            key={user.id}
            icon={createUserIcon(isMe)}
            position={convertLocationPropForMarker(user.location)}
            onClick={(event) => {
              event.stop();
              props.onMarkerClick(user)
            }}
          >
            {(props.selectedUser === user) ? renderSelectedMarkerInfo(user) : null}
          </Marker>
        );
      })}
    </GoogleMap>
  )
});

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null
    };
  }

  componentDidMount() {
    addUpdateLocationHandler( user => {
      this.props.updateCurrentLocation(user);
    });
    addLeaveRoomHandler( userId => {
      this.props.leaveUserFromRoom(userId);
    });

    const success = ({latitude, longitude}) => {
      const location = {latitude, longitude};
      const roomId = this.props.roomId
      emit({ location, roomId });
    };
    const error = (error) => console.error(error);

    // Initialize currentPostion.
    getCurrentPosition({success, error});

    // Update currentPosttion.
    watchPosition({success, error});
  }

  render() {
    if (!this.props.roomId) {
      return <Redirect to='/' />;
    }

    return(
      <div className="mapPage">
        <GameMap
          className="gameMap"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div style={{ height: '300px' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={()=>{}}
          onMapClick={()=>{}}
          onMarkerClick={(user) => {
            this.setState({selectedUser: user});
          }}
          onCloseInfoWindow={() => {
            this.setState({selectedUser: null});
          }}
          users={this.props.users}
          socketId={this.props.socketId}
          selectedUser={this.state.selectedUser}
        />
        <div>RoomID: {this.props.roomId}</div>
        <div>The number of players: {this.props.users.length}</div>
      </div>
    );
  }
}

const convertLocationPropForMarker = ({latitude, longitude}) => {
  return {lat: latitude, lng: longitude};
};

MapPage.propTypes = {
  updateCurrentLocation: PropTypes.func.isRequired,
  leaveUserFromRoom: PropTypes.func.isRequired,
  socketId: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  roomId: PropTypes.string,
};

export default MapPage;
