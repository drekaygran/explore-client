import React, { Fragment, Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import apiUrl from '../../apiConfig'
import Modal from 'react-bootstrap/Modal'

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
      this.setState({
        place: response.data.place
      })
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
    return (
      <div>
        { place && (
          <Fragment>
            <h1>{place.name}</h1>
            <h2>{place.description || 'No description available'}</h2>
            {(this.props.user && place) && this.props.user._id === place.owner ? <ButtonToolbar> <Button href={`#places/${place.id}/edit`}>Edit</Button> <Button variant="danger" onClick={handleShow}>Delete</Button> </ButtonToolbar> : ''}
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
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Place)
