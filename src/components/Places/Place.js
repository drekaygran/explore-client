import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import Rating from 'react-rating'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Col from 'react-bootstrap/Col'

import apiUrl from '../../apiConfig'
import Wrapper from '../App/Wrapper'

class Place extends Component {
  constructor () {
    super()

    this.state = {
      place: null,
      show: false,
      deleted: false
    }
  }

  async componentDidMount () {
    // console.log(this.props.match.params.id)
    try {
      const response = await axios(`${apiUrl}/places/${this.props.match.params.id}`)
      console.log(response.data)
      this.setState({ place: response.data.place })
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: 'Something went wrong',
        variant: 'danger'
      })
    }
  }

  destroy = () => {
    // event.preventDefault()
    axios({
      method: 'DELETE',
      url: `${apiUrl}/places/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => {
        this.props.alert({
          heading: 'Success!!',
          message: 'You deleted this place!',
          variant: 'success'
        })
      })
      .catch(error => {
        this.props.alert({
          heading: 'Error',
          message: 'Something went wrong',
          variant: 'danger'
        })
        console.error(error)
      })
  }

  render () {
    const { place, show, deleted } = this.state
    const handleShow = () => this.setState({ show: true })
    const handleClose = () => this.setState({ show: false })
    const deleteAndCloseModal = () => {
      this.destroy()
      handleClose()
    }
    if (deleted) {
      return <Redirect to={'/places'} />
    }
    const addressArr = []
    if (place && place.addresses[0]) {
      for (const [key, value] of Object.entries(place.addresses[0])) {
        if (value) {
          addressArr.push(`${key}: ${value}`)
        }
      }
    }

    return (
      <div>
        { place && (
          <Wrapper>
            <Col className="col-sm-10 col-md-8 mx-auto mt-5">
              <h3>{place.name}</h3>
              <h4>{place.description || 'No description available'}</h4>
              <h4>Rating:</h4>
              <Rating
                initialRating={place.rating}
                readonly
              />
              <h4>Address:</h4>
              {(this.props.user && place) && this.props.user.id === place.user.id ? <ButtonToolbar>
                <Button className="mr-2" href={`#places/${place.id}/edit`}>Edit</Button>

                <Accordion>
                  <Accordion.Toggle as={Button} eventKey="1" className="mr-2" variant="secondary" href={`#places/${place.id}/address`}>Update Address
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                   Hello! Address form component here
                  </Accordion.Collapse>
                </Accordion>
                <Button variant="danger" onClick={handleShow}>Delete</Button>
              </ButtonToolbar> : ''}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this place?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                     No, I changed my mind.
                  </Button>
                  <Button variant="danger" onClick={deleteAndCloseModal}>
                     Yes, delete this place
                  </Button>
                </Modal.Footer>
              </Modal>
              <br></br>
              {addressArr[0] ? <ul style={{ listStyle: 'none' }}>{addressArr.map(addressItem => <li key={addressItem}>{addressItem}</li>)}</ul> : <p>no address</p>}
            </Col>
          </Wrapper>
        )}
      </div>
    )
  }
}

export default withRouter(Place)
