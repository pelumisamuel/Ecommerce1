import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { savePaymentMethod } from '../Actions/cartActions'
import FormContainer from '../Components/FormContainer'
import CheckOutSteps from '../Components/CheckOutSteps'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const { shippingAddress } = cart
  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('paypal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    console.log('register clicked')
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend"> Select Method </Form.Label>
          <Form.Check
            type="radio"
            label="Paypal or credit card"
            id="paypal"
            value="paypal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>

          {/* <Form.Check
            type="radio"
            label="Stripe"
            value="stripe"
            id="stripe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check> */}
        </Form.Group>
        <Button type="submit" variant="primary" className="btn-block">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
