import {
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_PAY_FAIL,
  GET_PAY_REQUEST,
  GET_PAY_RESET,
  GET_PAY_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from '../Constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case GET_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }

    case GET_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PAY_REQUEST:
      return {
        loading: true,
      }

    case GET_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }

    case GET_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case GET_PAY_RESET: {
      return {}
    }
    default:
      return state
  }
}
