import { Router } from 'express'
import { addOrderItems, getOrderById } from '../Controllers/orderController.js'
import { protect } from '../Middlewares/authMiddlewares.js'

const router = Router()

//1 order of precedence
router.route('/').post(protect, addOrderItems)

//2
router.route('/:id').get(protect, getOrderById)

export default router