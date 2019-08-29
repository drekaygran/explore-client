import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import './../../index.scss'

import apiUrl from '../../apiConfig'
import Wrapper from '../App/Wrapper'

class Places extends Component {
  constructor () {
    super()

    this.state = {
      places: [],
      isLoading: true
    }
  }

  async componentDidMount () {
    try {
      // await response from API call
      const response = await axios(`${apiUrl}/places`)
      // do something with response
      this.setState({ places: response.data.places, isLoading: false })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    console.log('props user id', this.props.user.id)
    // style={{ background: { place.user.id === this.props.user.id ?  #83b582 : #d6e4aa } }}
    const placesJsx = this.state.places.map(place => (
      <Card border='dark' key={place.id} style={{ minWidth: '30vh' }}>
        <Link style={{ color: 'black' }} to={`/places/${place.id}`}>
          <Card.Header>{place.name}</Card.Header>
          <Card.Body style={{ color: 'grey' }}>{place.description}</Card.Body>
        </Link>
      </Card>
    ))

    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )
    }

    return (
      <Wrapper>
        <CardColumns style={{ paddingTop: '5vh' }}>
          {this.state.places.length ? placesJsx : <li>No places found</li>}
        </CardColumns>
      </Wrapper>
    )
  }
}

export default Places
