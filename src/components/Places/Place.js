import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import Rating from 'react-rating'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import styles from './AddressButton.css'
// import Col from 'react-bootstrap/Col'

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
      zoom: 13
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
              },
              zoom: 17
            })
          })
          .catch(() => {
            this.props.alert({
              heading: 'Error',
              message: 'Something went wrong',
              variant: 'danger'
            })
          })
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
    const { place, show, deleted, center, zoom } = this.state
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
            <div className="col-sm-12 col-md-6 mx-auto mt-5" style={{ paddingTop: '4vh' }}>
              <h2 className='place-data'>{place.name}</h2>
              <h4 className='place-data'>Description:</h4>
              <p className='place-data'>{place.description || 'No description available'}</p>
              <h4 className='place-data'>Rating:</h4>
              <Rating
                initialRating={place.rating}
                readonly
              />
              <h4 className='place-data'>Address:</h4>
              {addressArr[0] ? <div>{addressArr.map(addressItem => <p key={addressItem}>{addressItem}</p>)}</div> : <p>No address provided</p>}
              {(this.props.user && place) && this.props.user.id === place.user.id ? <ButtonToolbar>
                <Button className="mr-2 button primary" href={`#places/${place.id}/edit`}>Edit</Button>
                <Button className={`mr-2 button secondary ${addressArr[0] ? '' : styles.addressButtonShake}`} href={addressButton}>Update Address
                </Button>
                <Button className="button danger" onClick={handleShow}>Delete</Button>
              </ButtonToolbar> : ''}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this place?</Modal.Body>
                <Modal.Footer>
                  <Button className="button secondary" onClick={handleClose}>
                     No, I changed my mind.
                  </Button>
                  <Button className="button danger" onClick={deleteAndCloseModal}>
                     Yes, delete this place
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="col-sm-12 col-md-6 p-0" style={{ marginRight: '-30px' }}>
              <MyMap
                center={center}
                zoom={zoom}
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
