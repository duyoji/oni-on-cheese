import React, { Component } from "react"
import { compose, withProps } from "recompose"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const dummyMarkers = [
  { lat: 35.6641, lng: 139.7294 },
  { lat: 35.6621, lng: 139.7254 },
  { lat: 35.6631, lng: 139.7264 },
  { lat: 35.6661, lng: 139.7284 },
  { lat: 35.6681, lng: 139.7224 }
]

const MyMap = withGoogleMap(props => {
  dummyMarkers.map((marker, index) => {
    console.log(marker)
  })
  return (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 35.6641, lng: 139.7294 }}
  >
  {dummyMarkers.map((marker, index) => (
    <Marker
      position={marker}
      key={index}
    />
  ))}
  </GoogleMap>
  )
});

class Map extends Component {
  constructor(props){
    super(props);
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