import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PlaceForm = ({ place, handleChange, handleSubmit }) => (
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
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>)

export default PlaceForm
