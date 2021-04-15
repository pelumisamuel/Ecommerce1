import { Router } from 'express'
import {
  getUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../Controllers/usersController.js'
import { protect } from '../Middlewares/authMiddlewares.js'

const router = Router()
router.post('/', registerUser)
router.post('/login', getUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
