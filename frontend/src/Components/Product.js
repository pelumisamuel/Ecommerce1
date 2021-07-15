import { Card } from 'react-bootstrap'
import Ratings from './Ratings'
import { Link } from 'react-router-dom'

//import products from "../products";

const Product = ({ product }) => {
  return (
    <Card className='p-3 my-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name.split(' ', 3).join(' ')}</strong>{' '}
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>
            <Ratings value={product.rating} text='reviews' />
          </div>
        </Card.Text>
        <Card.Text as='h3'> ${product.price}</Card.Text>
        {product.isFavorite ? (
          <span>
            <i className='fas fa-heart' aria-hidden='true'></i>
          </span>
        ) : (
          <span>
            <i className='far fa-heart' aria-hidden='true'></i>
          </span>
        )}
      </Card.Body>
    </Card>
  )
}

export default Product
