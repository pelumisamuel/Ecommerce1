import { Router } from 'express'
import {
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from '../Controllers/usersController.js'
import { admin, protect } from '../Middlewares/authMiddlewares.js'

const router = Router()
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', getUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route('/:id').delete(protect, admin, deleteUser)
export default router
