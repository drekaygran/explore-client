import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import Rating from 'react-rating'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import styles from './AddressButton.css'
// import Col from 'react-bootstrap/Col'
// import { Map, GoogleApiWrapper } from 'google-maps-react'

import apiUrl from '../../apiConfig'
import MyMap from './MyMap'
import Geocode from 'react-geocode'
Geocode.setApiKey('AIzaSyBTP0q6wDlmvYjDJVE5Oa_ZeiSfX1-4fR4')

class Place extends Component {
  constructor (props) {
    super(props)

    this.state = {
      place: null,
      show: false,
      deleted: false,
      address: null,
      center: {
        lat: 42.376612,
        lng: -71.032973
      },
      text: 'Welcome to East Boston!'
    }
  }

  async componentDidMount () {
    try {
      // GET place
      const response = await axios(`${apiUrl}/places/${this.props.match.params.id}`)
      this.setState({ place: response.data.place })
      // If address exist set that too
      if (this.state.place.addresses[0]) {
        this.setState({ address: this.state.place.addresses[0] })
        const addressToGeocode = {}
        for (const [key, value] of Object.entries(this.state.address)) {
          (key === 'id' || key === 'place') ? addressToGeocode[key] = '' : addressToGeocode[key] = value
        }
        Geocode.fromAddress(JSON.stringify(Object.values(addressToGeocode)))
          .then(response => {
            const { lat, lng } = response.results[0].geometry.location
            this.setState({
              center: {
                lat: lat,
                lng: lng
              }
            })
          },
          error => {
            console.error(error)
          })
      } else {
        // display map with no marker
      }
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

  // clemson = () => {
  //   this.setState({
  //     center: {
  //       lat: 34.695894,
  //       lng: -82.825436
  //     }
  //   })
  // }

  render () {
    const { place, show, deleted, center } = this.state
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
    let addressButton
    if (place && place.addresses[0]) {
      addressButton = `#addresses/${place.addresses[0].id}/edit`
      for (const [key, value] of Object.entries(place.addresses[0])) {
        if (value) {
          let label
          switch (key) {
          case 'id':
            continue
          case 'street_1':
            label = 'Street'
            break
          case 'street_2':
            label = 'Apt/Unit #'
            break
          case 'city':
            label = 'City'
            break
          case 'state':
            label = 'State'
            break
          case 'zip_code':
            label = 'Zip Code'
            break
          }
          addressArr.push(`${label}: ${value}`)
        }
      }
    } else if (place) {
      addressButton = `#places/${this.props.match.params.id}/create-address`
    }

    // this.clemson()

    return (
      <div className="row">
        { place && (
          <React.Fragment>
            <div className="col-sm-11 col-md-6 mx-auto mt-5" style={{ paddingTop: '4vh' }}>
              <h3>{place.name}</h3>
              <h4>{place.description || 'No description available'}</h4>
              <h4>Rating:</h4>
              <Rating
                initialRating={place.rating}
                readonly
              />
              <h4>Address:</h4>
              <br></br>
              {addressArr[0] ? <ul style={{ listStyle: 'none' }}>{addressArr.map(addressItem => <li key={addressItem}>{addressItem}</li>)}</ul> : <p>No address provided</p>}
              {(this.props.user && place) && this.props.user.id === place.user.id ? <ButtonToolbar>
                <Button className="mr-2" href={`#places/${place.id}/edit`}>Edit</Button>
                <Button className={`mr-2 ${addressArr[0] ? '' : styles.addressButtonShake}`} variant="secondary" href={addressButton}>Update Address
                </Button>
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
            </div>
            <div className="col-sm-11 col-md-6 mx-auto mt-5">
              <MyMap
                center={center}
                zoom={17}
              >
              </MyMap>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Place)
