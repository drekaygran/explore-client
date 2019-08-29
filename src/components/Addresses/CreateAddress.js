import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import AddressForm from './AddressForm'

class CreateAddress extends Component {
  state = {
    address: {
      street_1: '',
      street_2: '',
      city: '',
      state: '',
      zip_code: '',
      place_id: this.props.match.params.id
    },
    updated: false
  }

  handleChange = event => {
    this.setState({ address: { ...this.state.address, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/addresses`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: this.state
    })
      .then(this.setState({ updated: true }))
      .then(res => {
        this.props.alert({
          heading: 'Success!!',
          message: 'You created an address!',
          variant: 'success'
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

  render () {
    if (this.state.updated) {
      return (
        <Redirect to={
          {
            pathname: '/places'
          }
        }/>
      )
    }
    return (
      <div style={{ paddingTop: '4vh' }}>
        <AddressForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          address={this.state.address}
        />
      </div>
    )
  }
}

export default withRouter(CreateAddress)
