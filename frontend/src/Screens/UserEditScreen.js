import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { userUpdateAction } from '../Actions/userAction'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const UserEditScreen = ({ history, match }) => {
    const userID = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  

  const dispatch = useDispatch()

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, error, user } = userUpdate
 

  useEffect(() => {
      if(!user.name || user._id !== userID){
          dispatch(userUpdateAction(userID))
      }else{
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
      }
   
  }, [ dispatch, user, userID])

  const submitHandler = (e) => {
    e.preventDefault()
 
  }

  return (
      <>
      <Link to='/admin/userslist' className='btn btn-light my-3'>
          Go Back
      </Link>
      

      <FormContainer>
      <h1>Edit User</h1>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:

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

      <Form.Group controlId='isadmin'>
        <Form.Check
          type='checkbox'
          label= 'Admin'
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}>
          </Form.Check>
      </Form.Group>

      <Button type='submit' variant='primary' className='btn-block'>
        Update
      </Button>
    </Form>
      }
      
    
    </FormContainer>
      </>
   
  )
}

export default UserEditScreen
