import express, { Router } from 'express'
import { getProduct, getProductID } from '../Controllers/productControllers.js'

//import { Error } from 'mongoose'
const router = Router()

router.get('/', getProduct)

//router.get('/:id', getProductID) => i prefer this method
router.route('/:id').get(getProductID)

export default router
