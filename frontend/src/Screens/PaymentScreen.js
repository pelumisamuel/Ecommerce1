import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { savePaymentMethod } from '../Actions/cartActions'
import FormContainer from '../Components/FormContainer'
import CheckOutSteps from '../Components/CheckOutSteps'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const { shippingAddress } = cart

  useEffect(() => {
    if (!shippingAddress.address) {
      history.push('/shipping')
    }
  }, [shippingAddress, history])

  const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    // console.log('register clicked')
    history.push('/placeorder')
    //console.log(paymentMethod)
  }

  return (
    <FormContainer>
      <CheckOutSteps
        step1
        step2
        step3={true}
        step4={cart.paymentMethod !== paymentMethod ? false : true}
      />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'> Select Method </Form.Label>
          <Form.Check
            type='radio'
            label='Paypal or credit card'
            id='paypal'
            value='paypal'
            name='payment'
            checked={
              paymentMethod === 'paypal' || !paymentMethod ? true : false
            }
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>

          <Form.Check
            type='radio'
            label='Stripe'
            value='stripe'
            id='stripe'
            name='payment'
            checked={paymentMethod === 'stripe' ? true : false}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check
            type='radio'
            label='Paystack'
            value='paystack'
            id='paystack'
            name='payment'
            checked={paymentMethod === 'paystack' ? true : false}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Form.Group>
        <Button type='submit' variant='primary' className='btn-block'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
