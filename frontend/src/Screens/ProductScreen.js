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
  Form,
} from 'react-bootstrap'
//import products from '../products'
import Ratings from '../Components/Ratings'
import { useEffect, useState } from 'react'
//import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProductDetails,
  createProductReviews,
} from '../Actions/ProductActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { PRODUCT_REVIEWS_RESET } from '../Constants/productListConstants'

const ProductScreen = ({ history, match }) => {
  //const [product, setSingleProduct] = useState({})
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const createProductReview = useSelector((state) => state.createProductReview)
  const { error: errorProductReview, success: successProductReview } =
    createProductReview

  useEffect(() => {
    if (successProductReview) {
      alert('review submitted')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_REVIEWS_RESET })
    }
    dispatch(listProductDetails(match.params.id))
    // const fetchData = async () => {
    //   const { data } = await axios.get(`/api/products/${match.params.id}`)
    //   setSingleProduct(data)
    //   console.log(data)
    // }
    // fetchData()
    // console.log(match.params.id)
  }, [match, dispatch, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  // const product = products.find((p) => p._id === match.params.id )
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReviews(match.params.id, { rating, comment }))
  }

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
        <>
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

                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
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
                  {product.countInStock !== 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
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
                      disabled={product.countInStock === 0}
                    >
                      {' '}
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message>No reviews yet</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Ratings value={review.rating} text={'stars'}>
                      {' '}
                    </Ratings>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>write a Custom Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label> Rating </Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''> Select...</option>
                          <option value='1'> 1 - Poor</option>
                          <option value='2'> 2 - Fair</option>
                          <option value='3'> 3 - Good</option>
                          <option value='4'> 4 - Very Good</option>
                          <option value='5'> 5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='rating'>
                        <Form.Label> Comment </Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                        className='btn-block'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      please <Link to='/login'> sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

ProductScreen.propTypes = {}

export default ProductScreen
