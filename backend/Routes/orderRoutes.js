import { Router } from 'express'
import { addOrderItems } from '../Controllers/orderController.js'
import { protect } from '../Middlewares/authMiddlewares.js'

const router = Router()
router.route('/').post(protect, addOrderItems)

export default router
