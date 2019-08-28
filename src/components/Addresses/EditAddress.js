import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import AddressForm from './AddressForm'

class EditAddress extends Component {
  state = {
    address: null
  }

  async componentDidMount () {
    try {
      const response = await axios({
        method: 'GET',
        url: `${apiUrl}/addresses/${this.props.match.params.id}`,
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ address: response.data.address })
      console.log(this.state.address)
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: 'Something went wrong',
        variant: 'danger'
      })
    }
  }

  handleChange = event => {
    this.setState({ address: { ...this.state.address, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/addresses/${this.state.address.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: this.state
    })
      .then(res => {
        this.props.alert({
          heading: 'Success!!',
          message: 'You updated this address!',
          variant: 'success'
        })
        this.props.history.push(`/addresses/${this.state.address.id}`)
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
    if (!this.state.address) {
      return (
        <h1>loading. hold on.</h1>
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

export default withRouter(EditAddress)
