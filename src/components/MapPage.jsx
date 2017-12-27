import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { getCurrentPosition, watchPosition } from '../utils/location';
import { emit, addHandlerListener as addUpdateLocationHandler } from '../socketHandlers/updateLocation';
import { addHandlerListener as addLeaveRoomHandler } from '../socketHandlers/leaveRoom';
import { addHandlerListener as addReconnectHandlerListener } from '../socketHandlers/reconnect';
import { createUserIcon } from '../utils/icon';
import { Redirect } from 'react-router-dom';
import MapLoader from './loaders/MapLoader';

const GameMap = withScriptjs(withGoogleMap(props => {
  const renderSelectedMarkerInfo = (user) => {
    return (
      <InfoWindow onCloseClick={props.onCloseInfoWindow}>
        <div>
          {user.name}
        </div>
      </InfoWindow>
    );
  };

  const controlOptions = {
    options: {
      fullscreenControl: false,
      mapTypeControl: false,
      panControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false
    }
  };

  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={15}
      defaultCenter={convertLocationPropForMarker(props.startLocation)}
      onClick={(event) => {
        event.stop();
        props.onMapClick()
      }}
      {...controlOptions}
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
}));

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
      startLocation: null
    };
  }

  componentDidMount() {
    addUpdateLocationHandler( user => {
      this.props.updateCurrentLocation(user);
    });
    addLeaveRoomHandler( userId => {
      this.props.leaveUserFromRoom(userId);
    });
    addReconnectHandlerListener( socket => {
      const newUserId = socket.id;
      this.props.reconnectedToSocket(newUserId);
      this.props.rejoinRoom(this.props.roomId);
    });

    const success = ({latitude, longitude}) => {
      const location = {latitude, longitude};
      const roomId = this.props.roomId;
      const name = this.props.userName;
      emit({ location, roomId, name });

      if(!this.state.startLocation) {
        this.setState({
          startLocation: {latitude, longitude}
        });
      }
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

    if(!this.state.startLocation) {
      const style = {
        height: '300px',
        textAlign: 'center',
        background: '#E5E3DF'
      };

      return (
        <MapLoader style={style}/>
      );
    }

    return(
      <div className="mapPage">
        <GameMap
          className="gameMap"
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCbwlqVCEnZdTeR6RbEPHm6xgHySVpimKk"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: '300px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
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
          startLocation={this.state.startLocation}
        />
        <div>RoomID: {this.props.roomId}</div>
        <div>The number of players: {this.props.users.length}</div>
        <div>updateLocationCounter: {this.props.updateLocationCounter}</div>
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
  reconnectedToSocket: PropTypes.func.isRequired,
  rejoinRoom: PropTypes.func.isRequired,
  socketId: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  userName: PropTypes.string,
  roomId: PropTypes.string,
};

export default MapPage;
