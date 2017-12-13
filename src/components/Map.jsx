import React, { Component } from "react"
import { compose, withProps } from "recompose"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMap = withGoogleMap(props => {
  return (
  <GoogleMap
    defaultZoom={8}
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

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MyMap
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default Map;