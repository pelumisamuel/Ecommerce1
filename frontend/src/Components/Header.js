import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../Actions/userAction'

const Header = () => {
  const dispatch = useDispatch()
  const { userLogin, userInfo } = useSelector((state) => state.userLogin)
  const users = useSelector((state) => state.userLogin)
  //const userLogin = useSelector((state) => state.userLogin);
  const { userInfoUpdate } = useSelector((state) => state.userUpdateProfile)
  // if (userInfoUpdate) {
  //   let userInfo = userInfoUpdate;
  // }

  // } else {

  //   const userLogin = useSelector((state) => state.userLogin);
  // }

  //console.log(userUpdateProfile.userInfo);
  //console.log(name);
  //const { userInfo } = userLogin
  //console.log(userLogin);
  console.log(users)

  const logoutHandler = () => {
    dispatch(logoutAction())
    console.log(userLogin)
  }

  return (
    // test
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto ">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={userInfoUpdate ? userInfoUpdate.name : userInfo.name}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
