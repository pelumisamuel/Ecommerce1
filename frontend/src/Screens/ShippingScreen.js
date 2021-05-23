import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { saveShippingAddress } from '../Actions/cartActions'
import FormContainer from '../Components/FormContainer'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    console.log('register clicked')
    history.push('/payments')
  }

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label> Address </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label> City </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label> postal Code </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="Country">
          <Form.Label> Country </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="btn-block">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
