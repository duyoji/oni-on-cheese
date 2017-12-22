import React, { Component } from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'; // eslint-disable-line no-unused-vars
import { getCurrentPosition } from '../utils/location';
import { emit, addHandlerListener } from '../socketHandlers/updateLocation';
import { createUserIcon } from '../utils/icon';

const GameMap = withGoogleMap(props => ( // eslint-disable-line no-unused-vars
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={15}
    defaultCenter={{ lat: 35.6641, lng: 139.7294 }}
    onClick={props.onMapClick}
  >
    {props.users.map(user => (
      <Marker
        key={user.id}
        icon={createUserIcon()}
        position={convertLocationPropForMarker(user.location)}
      />
    ))}
  </GoogleMap>
));

class MapPage extends Component {
  componentDidMount() {
    addHandlerListener( user => {
      this.props.updateCurrentLocation(user);
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
    window.setInterval(() => {
      getCurrentPosition({success, error});
    }, 10000);
  }

  render() {
    return(
      <div className="mapPage">
        <h2>MapPage</h2>
        <GameMap
          className="gameMap"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div style={{ height: '500px' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={()=>{}}
          onMapClick={()=>{}}
          users={this.props.users}
        />
      </div>
    );
  }
}

const convertLocationPropForMarker = ({latitude, longitude}) => {
  return {lat: latitude, lng: longitude};
};

MapPage.propTypes = {
  users: PropTypes.array.isRequired,
  roomId: PropTypes.string.isRequired,
  updateCurrentLocation: PropTypes.func.isRequired
};

export default MapPage;
