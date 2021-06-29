import express, { Router } from 'express'
import { getProduct, getProductID, createProductReview } from '../Controllers/productControllers.js'
import{ protect} from '../Middlewares/authMiddlewares.js'

//import { Error } from 'mongoose'
const router = Router()

//router.get('/:id', getProductID) => i prefer this method
router.get('/', getProduct)

router.route('/:id').get(getProductID)
router.route('/:id/reviews').post(protect, createProductReview)

export default router
