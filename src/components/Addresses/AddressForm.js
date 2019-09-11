import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddressForm = ({ address, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <h5>Please enter a street address within the neightborhood of East Boston, MA 02128</h5>
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
    <Button className="button primary" type="submit">
      Submit
    </Button>
  </Form>)

export default AddressForm
