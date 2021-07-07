import { useDispatch, useSelector } from 'react-redux'
import { topRatedProducts } from '../Actions/ProductActions'
import Loader from './Loader'
import Message from './Message'
import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from './Product'

const TopProducts = () => {
  const dispatch = useDispatch()

  const topProducts = useSelector((state) => state.topProducts)
  const { products, error, loading } = topProducts

  //console.log(products)

  useEffect(() => {
    dispatch(topRatedProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1> Top Products </h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default TopProducts
