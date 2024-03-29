import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { usersListAction, userDeleteAction } from '../Actions/userAction'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import ModalTest from '../Components/Modal'
import { LinkContainer } from 'react-router-bootstrap'

const UsersListSreen = ({ history }) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  // get clicked user id from state
  const [userID, setUserID] = useState(null)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // function passed to  modal action props
  const deleteUser = () => {
    setShow(false)
    dispatch(userDeleteAction(userID))
  }

  const usersList = useSelector((state) => state.usersList)
  const { loading, users, error } = usersList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(usersListAction())
    } else {
      history.push('/login')
    }
    // dispatch(usersListAction())
  }, [dispatch, history, userInfo, successDelete])

  // const deleteHandler = (id) => {
  //   handleShow()
  //   console.log(id)

  //   //console.log('delete')
  //   //dispatch(userDeleteAction(id))
  // }

  return (
    <>
      <ModalTest
        handleClose={handleClose}
        show={show}
        action={userID && deleteUser}
      />
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto: ${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }} />
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit' />
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => {
                      handleShow()
                      setUserID(user._id)

                      //console.log(userID)
                    }}
                  >
                    <i className='fas fa-trash' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UsersListSreen
