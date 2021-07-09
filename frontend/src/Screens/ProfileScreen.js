import { useState, useEffect } from 'react'

import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {
  userDetailsAction,
  userUpdateProfileAction,
} from '../Actions/userAction'
import { getUserOrders } from '../Actions/orderActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const userOrders = useSelector((state) => state.userOrders)
  const { loading: loadingOrders, orders, error: errorOrders } = userOrders

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  console.log(userInfo)

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(userDetailsAction())
        dispatch(getUserOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(userUpdateProfileAction({ id: user._id, name, email, password }))
      setPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h1>Update your details</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {success && <Message variant='success'>update Successful</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label> Name </Form.Label>
            <Form.Control
              type='name'
              placeholder='enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label> Email Address </Form.Label>
            <Form.Control
              type='email'
              placeholder='enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label> Password </Form.Label>
            <Form.Control
              type='password'
              placeholder='enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmpassword'>
            <Form.Label> Confirm Password </Form.Label>
            <Form.Control
              type='password'
              placeholder='enter Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='btn-block'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>User orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>TOTAL</th>
                <th>DATE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  style={{ color: order.isPaid ? 'green' : 'black' }}
                >
                  <td>{order._id}</td>
                  <td>$ {order.totalPrice}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td style={{ color: 'green' }}>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
