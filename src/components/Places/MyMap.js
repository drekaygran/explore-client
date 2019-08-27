import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'

import Wrapper from '../App/Wrapper'

class MyMap extends Component {
  constructor () {
    super()

    this.state = {}
  }

  render () {
    return (
      <Wrapper>
        <Col xs={12} md={6}>
        </Col>
        <Col xs={12} md={6}>
          <Map
            google={this.props.google}
            zoom={15}
            initialCenter={{ lat: 42.376612, lng: -71.032973 }}
          />
        </Col>
      </Wrapper>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDHOal4qk8UQoORBP2WCWQ9ccoxzm0t5N0'
})(MyMap)
