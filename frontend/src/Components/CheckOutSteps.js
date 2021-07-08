import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckOutSteps = ({
  step1,
  step2,
  step3 = { Boolean },
  step4 = { Boolean },
}) => {
  return (
    <Nav className='justify-content-center mb-4' variant='tabs'>
      {/* <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link active>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign in</Nav.Link>
        )}
      </Nav.Item> */}

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link active>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payments'>
            <Nav.Link active>Payments</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payments</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link active>Place order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckOutSteps
