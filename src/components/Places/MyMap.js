import React from 'react'
import GoogleMapReact from 'google-map-react'
// import Col from 'react-bootstrap/Col'
// import Marker from './Marker.js'
// import { withRouter } from 'react-router'
// import Row from 'react-bootstrap/Row'

// import Wrapper from '../App/Wrapper'

// const SetCenter = ({ text }) => <div>{text}</div>
const eastBoston = {
  center: {
    lat: 42.376612,
    lng: -71.032973
  }
}

const MyMap = ({ center, zoom }) => (
  // console.log('center', center)
  <div className='p-0' style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyDHOal4qk8UQoORBP2WCWQ9ccoxzm0t5N0' }}
      defaultCenter={eastBoston}
      center={center}
      defaultZoom={14}
      zoom={zoom}
    >
      {
      // <SetCenter
      //   lat={center.lat}
      //   lng={center.lng}
      //   text={text}
      // />
      }
    </GoogleMapReact>
  </div>
)

export default MyMap
