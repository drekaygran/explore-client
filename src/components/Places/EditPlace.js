import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import PlaceForm from './PlaceForm'

class EditPlace extends Component {
  state = {
    place: null
  }

  componentDidMount () {
    axios(`${apiUrl}/places/${this.props.match.params.id}`)
      .then(response => this.setState({ place: response.data.place }))
      .catch(() => this.props.alert({
        heading: 'Error',
        message: 'Something went wrong',
        variant: 'danger'
      }))
  }

  handleChange = event => {
    this.setState({ place: { ...this.state.place, [event.target.name]: event.target.value } })
  }

  handleRateChange = event => {
    this.setState({ place: { ...this.state.place, rating: event } })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/places/${this.state.place.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: this.state
    })
      .then(res => {
        this.props.alert({
          heading: 'Success!!',
          message: 'You updated a place!',
          variant: 'success'
        })
        this.props.history.push(`/places/${this.state.place.id}`)
      })
      .catch(error => {
        console.error(error)
        this.props.alert({
          heading: 'Error',
          message: 'Something went wrong',
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.place) {
      return (
        <h1>loading. hold on.</h1>
      )
    }
    return (
      <div style={{ paddingTop: '4vh' }}>
        <PlaceForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          place={this.state.place}
          handleRateChange={this.handleRateChange}
        />
      </div>
    )
  }
}

export default withRouter(EditPlace)
