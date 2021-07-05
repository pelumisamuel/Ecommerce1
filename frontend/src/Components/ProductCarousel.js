import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { topRatedProducts } from '../Actions/ProductActions'
import Loader from './Loader'
import Message from './Message'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const ProductCarousel = () => {
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
      <Carousel pause='hover' className='bg-dark'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className='carousel-caption'>
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default ProductCarousel
