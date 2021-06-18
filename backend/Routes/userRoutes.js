import { Router } from 'express'
import {
  deleteUser,
  getUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
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

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
export default router
