import Product from '../Models/productModel.js'
import asyncHandler from 'express-async-handler'

export const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

export const getProductID = asyncHandler(async (req, res) => {
  //iterating the JSON model
  //   const product = products.find((p) => p._id === req.params.id)
  const product = await Product.findById(req.params.id)
  // try {
  //   const product = await Product.findById(req.params.id)
  //   res.json(product)
  // } catch (error) {
  //   res.status(404).json('I dont have that')
  //   console.log(error)
  // }

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'product not found' })
  }
})
