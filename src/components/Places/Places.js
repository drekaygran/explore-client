import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
// import CardDeck from 'react-bootstrap/CardDeck'
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
    // const legend = (
    //   <CardDeck className='row'>
    //     <Card border='dark' className='p-auto col-sm-6 col-md-' style={{
    //       background: '#A5AA93'
    //     }}
    //     >Your places</Card>
    //     <Card border='dark' style={{
    //       maxWidth: '15vh',
    //       maxHeight: '10vh',
    //       background: '#F3D0B5'
    //     }}
    //     >Other Places</Card>
    //   </CardDeck>
    // )
    const placesJsx = this.state.places.map(place => (
      <Card border='dark' key={place.id} style={{
        minWidth: '30vh',
        background: place.user.id === this.props.user.id ? '#A5AA93' : '#F3D0B5'
      }}
      >
        <Link style={{ color: '#343a40' }} to={`/places/${place.id}`}>
          <Card.Header>{place.name}</Card.Header>
          <Card.Body style={{ color: '#343a40' }}>{place.description}</Card.Body>
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
    // {legend}

    return (
      <Wrapper>
        <CardColumns style={{ paddingTop: '5vh' }}>
          {this.state.places.length ? placesJsx : <li>No places yet. Add one!</li>}
        </CardColumns>
      </Wrapper>
    )
  }
}

export default Places
