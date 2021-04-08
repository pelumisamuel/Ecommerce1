import express, { Router } from 'express'
import Product from '../Models/productModel.js'
import asyncHandler from 'express-async-handler'
const router = Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
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
)

export default router