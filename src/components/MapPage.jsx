import React, { Component } from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'; // eslint-disable-line no-unused-vars
import { getCurrentPosition, watchPosition } from '../utils/location';
import { emit, addHandlerListener } from '../socketHandlers/updateLocation';
import { createUserIcon } from '../utils/icon';
import { Redirect } from 'react-router-dom';

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
    watchPosition({success, error});
  }

  render() {
    if (!this.props.roomId) {
      return <Redirect to='/' />;
    }

    return(
      <div className="mapPage">
        <h2>MapPage</h2>
        <GameMap
          className="gameMap"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div style={{ height: window.innerHeight }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={()=>{}}
          onMapClick={()=>{}}
          users={this.props.users}
        />
        <div>
          <h3>User List</h3>
          {this.props.users.map(user => (
            <div key={user.id}>{user.id} : {JSON.stringify(user.location)}</div>
          ))}
        </div>
        <div>
          <h3>Receive Counter: {this.props.receiveCounter}</h3>
        </div>
      </div>
    );
  }
}

const convertLocationPropForMarker = ({latitude, longitude}) => {
  return {lat: latitude, lng: longitude};
};

MapPage.propTypes = {
  updateCurrentLocation: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  roomId: PropTypes.string
};

export default MapPage;
