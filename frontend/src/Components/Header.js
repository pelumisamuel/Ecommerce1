import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../Actions/userAction'
import SearchBox from './SearchBox'

const Header = ({ history }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  // const users = useSelector((state) => state.userLogin)
  //const userLogin = useSelector((state) => state.userLogin);
  const { userInfoUpdate } = useSelector((state) => state.userUpdateProfile)
  //  if (userInfoUpdate) {
  //  let userInfo = userInfoUpdate;
  // }

  // } else {

  //   const userLogin = useSelector((state) => state.userLogin);
  // }

  //console.log(userUpdateProfile.userInfo);
  //console.log(name);
  //const { userInfo } = userLogin
  //console.log(userLogin);
  //console.log(users)

  const logoutHandler = () => {
    dispatch(logoutAction())
    //console.log(userLogin)
  }

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>DropShop</Navbar.Brand>
          </LinkContainer>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown
                    title={userInfoUpdate ? userInfoUpdate.name : userInfo.name}
                    id='username'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user' /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <>
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userslist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
