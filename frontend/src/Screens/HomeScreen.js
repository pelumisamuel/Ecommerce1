import { Row, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../Components/Product'
import { listProducts } from '../Actions/ProductActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Paginate from '../Components/Paginate'

import Meta from '../Components/Meta'
import TopProducts from '../Components/TopProducts'
import PageCarousel from '../Components/PageCarousel'

// import axios from 'axios'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1
  // console.log(keyword)
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  // const [products, setProducts] = useState([])
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))

    // const fetchProducts = async () => {
    //   const { data } = await axios.get('/api/products')
    //   setProducts(data)
    // }

    // fetchProducts()
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error}....</Message>
      ) : (
        <>
          {/* {!keyword ? (
            <PageCarousel />
          ) : (
            <Link to='/' className='btn btn-light'>
              back
            </Link>
          )}

          {!keyword && pageNumber < 2 && <TopProducts />}

          {!keyword && <h1>Latest Products</h1>} */}

          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
