import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { userRegisterAction } from '../Actions/userAction'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo: loggedInUser } = userLogin

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister
  console.log(userInfo)

  const redirect = location.search ? location.search.split('=')[1] : '/'
  console.log(redirect)
  // useEffect(() => {
  //   if (loginUser) {
  //     history.push(redirect)
  //   }
  // }, [history, redirect, userInfo, loginUser])

  useEffect(() => {
    if (loggedInUser) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo, loggedInUser])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(userRegisterAction(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
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
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an Account?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            {' '}
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
