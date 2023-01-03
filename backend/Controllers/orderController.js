import Order from '../Models/orderModel.js'
import asyncHandler from 'express-async-handler'

// @description Create new order
// @route Post /api/orders
// @access Private

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createOrder = await order.save()
    res.status(201).json(createOrder)
  }
})

// @description get new order
// @route get /api/orders
// @access Private

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('order not found')
  }
})

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order =  await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymnentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.status(201).json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('order not found')
  }
})

// @description get all orders
// @route get /api/orders/myorders
// @access Private

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id })

  if (orders) {
    res.json(orders)
  } else {
    res.status(404)
    throw new Error('orders not found')
  }
})
