import type { Request, Response } from 'express'
import { authService } from '../services/authService'

export const authController = {
  // Login
  login: (req: Request, res: Response): void => {
    try {
      const { email, password } = req.body

      // Validar campos de email y contraseña
      if (!email || !password) {
        res.status(400).json({ 
          message: 'Email y password son requeridos' 
        })
        return
      }

      // Validar credenciales
      const user = authService.validateCredentials(email, password)
      
      if (!user) {
        res.status(401).json({ 
          message: 'Credenciales inválidas' 
        })
        return
      }

      // Generar token
      const token = authService.generateToken(user)

      // Respuesta sin la contraseña
      const { password: _, ...userWithoutPassword } = user
      
      res.json({
        token,
        user: userWithoutPassword
      })

    } catch (error) {
      console.error('Error en login:', error)
      res.status(500).json({ 
        message: 'Error interno del servidor' 
      })
    }
  }
}