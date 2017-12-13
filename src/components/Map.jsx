import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const dummyMarkers = [
  { lat: 35.6641, lng: 139.7294 },
  { lat: 35.6621, lng: 139.7254 },
  { lat: 35.6631, lng: 139.7264 },
  { lat: 35.6661, lng: 139.7284 },
  { lat: 35.6681, lng: 139.7224 }
]

const MyMap = withGoogleMap(props => {
  return (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 35.6641, lng: 139.7294 }}
  >
  {props.locations.map((marker, index) => (
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
    this.state = {
      locations: dummyMarkers
    }
  }

  componentDidMount(){
    setInterval(() => {
      const newlocations = this.state.locations.map(l => {
        return {
          lat: l.lat + 0.0001,
          lng: l.lng + 0.0001
        }
      })
      this.setState({locations: newlocations})
    }, 1000);
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
        locations={this.state.locations}
      />
    )
  }
}

export default Map;