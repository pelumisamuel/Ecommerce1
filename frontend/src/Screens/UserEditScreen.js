import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { userDetailsAction, updateUserAction } from '../Actions/userAction'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { UPDATE_USER_RESET } from '../Constants/usersConstants'

const UserEditScreen = ({ history, match }) => {
  const userID = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const updateUser = useSelector((state) => state.updateUser)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updateUser

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_USER_RESET })
    } else {
      if (!user.name || user._id !== userID) {
        dispatch(userDetailsAction())
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, userID, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserAction({ _id: userID, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userslist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' className='btn-block'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
