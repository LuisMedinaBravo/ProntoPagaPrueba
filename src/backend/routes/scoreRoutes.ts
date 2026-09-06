import { Router } from 'express'
import { scoreController } from '../controllers/scoreController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

// Consultar score, protegido y autorizado
router.get(
  '/:rut',
  authMiddleware.authenticate,
  authMiddleware.authorizeScore,
  scoreController.getScore
)

export default router