import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import apiUrl from '../../apiConfig'

class DeletePlace extends Component {
  constructor (props) {
    super(props)
    this.state = {
      place: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/places/${this.props.match.params.id}`)
      .then(response => this.setState({ place: response.data.place }))
      .then(this.handleSubmit)
      .catch(() => this.props.alert({
        heading: 'Error',
        message: 'Something went wrong',
        variant: 'danger'
      }))
  }

  handleSubmit = () => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/places/${this.state.place.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: this.state
    })
      .then(() => {
        this.setState({
          deleted: true
        })
      })
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
    return (
      <React.Fragment>
        done
      </React.Fragment>
    )
  }
}

export default withRouter(DeletePlace)
