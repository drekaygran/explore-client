import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Rating from 'react-rating'

const PlaceForm = ({ place, handleChange, handleRateChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Place Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter name of the place"
        value={place.name}
        onChange={handleChange}
        name="name"
        required
      />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter an description"
        value={place.description}
        onChange={handleChange}
        name="description"
      />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Rating</Form.Label>
      <Rating
        type="integer"
        value={place.rating}
        onChange={handleRateChange}
        name="rating"
        initialRating={place.rating}
      />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>)

export default PlaceForm
