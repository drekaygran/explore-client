import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddressForm = ({ address, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Street</Form.Label>
      <Form.Control
        type="text"
        placeholder="123 Strawberry Fields"
        value={address.street_1}
        onChange={handleChange}
        name="street_1"
        required
      />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Apt/Unit #</Form.Label>
      <Form.Control
        type="text"
        placeholder="#42"
        value={address.street_2}
        onChange={handleChange}
        name="street_2"
      />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>City</Form.Label>
      <Form.Control
        type="text"
        placeholder="Gotham"
        value={address.city}
        onChange={handleChange}
        name="city"
      />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>State</Form.Label>
      <Form.Control
        type="text"
        placeholder="MA"
        value={address.state}
        onChange={handleChange}
        name="state"
      />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Zip Code</Form.Label>
      <Form.Control
        type="text"
        placeholder="02134"
        value={address.zip_code}
        onChange={handleChange}
        name="zip_code"
      />
    </Form.Group>
    <Button className="button primary" type="submit">
      Submit
    </Button>
  </Form>)

export default AddressForm
