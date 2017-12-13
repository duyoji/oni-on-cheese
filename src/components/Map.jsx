import React, { Component } from "react"
import { compose, withProps } from "recompose"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMap = withGoogleMap(props => {
  return (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 35.6641, lng: 139.7294 }}
  >
  <Marker
    position={{ lat: 35.6641, lng: 139.7294 }}
  />
  </GoogleMap>
  )
});
  

class Map extends Component {
  constructor(props){
    super(props);
    this.state = { isMarkerShown: false }
  }

  render() {
    return (
      <MyMap
        containerElement={
          <div style={{ height: '500px' }} />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
      />
    )
  }
}

export default Map;