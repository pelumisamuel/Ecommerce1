import { useEffect } from 'react'
import { link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form } from 'react-bootstrap'
import Message from '../Components/Message'
import { addToCart } from '../Actions/cartActions'
import Loader from '../Components/Loader'

const CartScreen = ({ match, location, history }) => {
  const productID = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty))
    }
  }, [useEffect, productID, qty])

  return <div>Cart</div>
}

export default CartScreen
