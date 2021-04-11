import { Router } from 'express'
import { getUser } from '../Controllers/usersController.js'

const router = Router()

router.post('/login', getUser)

export default router
