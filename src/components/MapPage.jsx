import React, { Component } from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'; // eslint-disable-line no-unused-vars

const GameMap = withGoogleMap(props => ( // eslint-disable-line no-unused-vars
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={15}
    defaultCenter={{ lat: 35.6641, lng: 139.7294 }}
    onClick={props.onMapClick}
  >
    {props.users.map(user => (
      <Marker
        position={convertLocationPropForMarker(user.location)}
      />
    ))}
  </GoogleMap>
));

const convertLocationPropForMarker = ({latitude, longitude}) => {
  return {lat: latitude, lng: longitude};
};


class MapPage extends Component {
  componentDidMount() {}

  render() {
    return(
      <div>
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
          onMapLoad={()=>{console.log('Map loaded');}}
          onMapClick={()=>{}}
          users={this.props.users}
        />
      </div>
    );
  }
}

MapPage.propTypes = {
  users: PropTypes.array.isRequired
};

export default MapPage;
