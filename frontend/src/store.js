import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  createProductReviewReducer,
  productTopRatedReducer,
} from './Reducers/productReducers'
import { cartReducer } from './Reducers/cartReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  getUserOrdersReducer,
} from './Reducers/orderReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  usersListReducer,
  userDeleteReducer,
  updateUserReducer,
} from './Reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  topProducts: productTopRatedReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userOrders: getUserOrdersReducer,
  usersList: usersListReducer,
  userDelete: userDeleteReducer,
  updateUser: updateUserReducer,
  createProductReview: createProductReviewReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const shippingFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingFromStorage,
    paymentMethod: paymentFromStorage,
  },
  userLogin: { userInfo: userFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
