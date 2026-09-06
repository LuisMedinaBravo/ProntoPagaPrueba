import { Router } from 'express'
import { authController } from '../controllers/authController'

const router = Router()

// Login
router.post('/login', authController.login)

export default router