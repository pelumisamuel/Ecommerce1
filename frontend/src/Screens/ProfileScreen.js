import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { userUpdateAction } from '../Actions/userAction'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, error, user } = userUpdate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  console.log(userUpdate)
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(userUpdateAction('profile'))
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
      dispatch(userUpdateAction('profile'))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h1>Update your details</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label> Name </Form.Label>
            <Form.Control
              type='name'
              placeholder='enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label> Email Address </Form.Label>
            <Form.Control
              type='email'
              placeholder='enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label> Password </Form.Label>
            <Form.Control
              type='password'
              placeholder='enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmpassword'>
            <Form.Label> Confirm Password </Form.Label>
            <Form.Control
              type='password'
              placeholder='enter Confirm password'
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='btn-block'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}></Col>
    </Row>
  )
}

export default ProfileScreen
