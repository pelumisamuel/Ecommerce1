import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_REVIEWS_REQUEST,
  PRODUCT_REVIEWS_FAIL,
  PRODUCT_REVIEWS_SUCCESS,
} from '../Constants/productListConstants'

//double arrow function possible because of thunk
export const listProducts =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const { data } = await axios.get(`/api/products?keyword=${keyword}`)

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProductReviews =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_REVIEWS_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        config
      )

      // check the data output here
      console.log(data)

      dispatch({
        type: PRODUCT_REVIEWS_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_REVIEWS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
