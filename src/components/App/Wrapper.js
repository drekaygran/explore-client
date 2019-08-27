import React from 'react'
// import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Wrapper = props => {
  return (
    <Row style={{ height: 'calc(100vh - 56px)' }}>
      {props.children}
    </Row>
  )
}

export default Wrapper
