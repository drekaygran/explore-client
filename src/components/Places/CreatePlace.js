import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import PlaceForm from './PlaceForm'

class CreatePlace extends Component {
  state = {
    place: {
      name: '',
      description: '',
      rating: '',
      addresses: [{
        place_id: ''
      }]
    }
  }

  handleChange = event => {
    this.setState({ place: { ...this.state.place, [event.target.name]: event.target.value } })
  }

  handleRateChange = event => {
    this.setState({ place: { ...this.state.place, rating: event } })
  }

  handleSubmit = event => {
    event.preventDefault()
    // this.setState({ place: { ...this.state.place, addresses: [{ place_id: this.state.place.id }] } })
    // console.log(this.state.place)
    axios({
      method: 'POST',
      url: `${apiUrl}/places`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: this.state
    })
      .then(res => {
        this.props.alert({
          heading: 'Success!!',
          message: 'You created a place!',
          variant: 'success'
        })
        this.props.history.push(`/places/${res.data.place.id}`)
      })
      .catch(console.error)
  }

  render () {
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

export default withRouter(CreatePlace)
