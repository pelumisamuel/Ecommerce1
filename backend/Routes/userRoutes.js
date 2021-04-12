import { Router } from 'express'
import { getUser, getUserProfile } from '../Controllers/usersController.js'
import { protect } from '../Middlewares/authMiddlewares.js'

const router = Router()

router.post('/login', getUser)
router.get('/profile', protect, getUserProfile)

export default router
