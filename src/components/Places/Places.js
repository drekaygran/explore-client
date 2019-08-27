import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

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
    // console.log(this.state.places)
    const placesJsx = this.state.places.map(place => (
      <Card border='dark' key={place.id} style={{ minWidth: '30vh' }}>
        <Card.Header>
          <Link style={{ color: 'black' }} to={`/places/${place.id}`} >{place.name}</Link>
        </Card.Header>
        <Card.Body style={{ color: 'grey' }}>
          {place.description}
        </Card.Body>
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
      <CardColumns style={{ paddingTop: '5vh' }}>
        {this.state.places.length ? placesJsx : <li>No places found</li>}
      </CardColumns>
    )
  }
}

export default Places
