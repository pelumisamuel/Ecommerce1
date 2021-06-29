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

/**
 *  I have chunk of code to write here for the admin backend function
 */


// 1 create new review
// 2. route:  POST /api/product/:id/reviews
// 3. access: Private

export const createProductReview = asyncHandler(async (req, res) => {
  //console.log(req);
  const{comment, rating} = req.body

  const product = await Product.findById(req.params.id)

  if(product){
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name:req.user.name,
      rating:Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    
     product.numReviews = product.reviews.length

    product.rating= product.reviews.reduce((acc, item) => item.rating + acc, 0)/ product.reviews.length

    await product.save()
    res.status(201).json({message:'Review added'}) 
  }else{
    res.status(404)
    throw new Error('product not found')
  }

  res.json(product)
})
