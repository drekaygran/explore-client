import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

class MyMap extends Component {
  constructor () {
    super()

    this.state = {}
  }

  render () {
    // const mapStyles = {
    //     width: 100%;
    //     height: 400px;
    //     background-color: grey;
    //   }
    return (
      <Map
        google={this.props.google}
        zoom={8}
        // style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDHOal4qk8UQoORBP2WCWQ9ccoxzm0t5N0'
})(MyMap)
