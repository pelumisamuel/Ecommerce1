//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap'
//import products from '../products'
import Ratings from '../Components/Ratings'
import { useEffect, useState } from 'react'
//import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../Actions/ProductActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  //const [product, setSingleProduct] = useState({})
  const [qty, setQty] = useState(1)

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
    // const fetchData = async () => {
    //   const { data } = await axios.get(`/api/products/${match.params.id}`)
    //   setSingleProduct(data)
    //   console.log(data)
    // }
    // fetchData()
    console.log(match.params.id)
  }, [match, dispatch])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  // const product = products.find((p) => p._id === match.params.id )

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3> {product.name} </h3>
              </ListGroupItem>
              <ListGroupItem>
                <Ratings
                  value={product.rating}
                  text={`out of ${product.numReviews}  reviews`}
                />
              </ListGroupItem>

              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong> {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {' '}
                        {product.countInStock === 0
                          ? 'Out of Stock'
                          : `${product.countInStock} item(s) in stock`}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <FormControl
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map(
                            (num) => (
                              <option key={num + 1} value={num + 1}>
                                {num + 1}
                              </option>
                            )
                          )}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}>
                    {' '}
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

ProductScreen.propTypes = {}

export default ProductScreen
