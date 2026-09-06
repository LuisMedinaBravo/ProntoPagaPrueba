import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import type { TokenPayload } from '../types'

const normalizeRut = (rut: string) => {
  return rut.replace(/[^0-9kK]/g, '').toUpperCase()
}

export const authMiddleware = {
  // Verificar JWT
  authenticate: (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ 
          message: 'Token no proporcionado' 
        })
        return
      }

      const token = authHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
      
      // Guardar usuario en la request
      (req as any).user = decoded
      
      next()
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: 'Token expirado' })
        return
      }
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: 'Token inválido' })
        return
      }
      
      res.status(500).json({ message: 'Error al verificar token' })
    }
  },

  // Verificar autorización para /score/:rut
  authorizeScore: (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user as TokenPayload
    const requestedRut = Array.isArray(req.params.rut)
      ? req.params.rut[0]
      : req.params.rut
    
    // Admin puede consultar cualquier RUT
    if (user.role === 'admin') {
      next()
      return
    }
    
    // User solo puede consultar su propio RUT
    if (user.rut && normalizeRut(user.rut) === normalizeRut(requestedRut)) {
      next()
      return
    }
    
    res.status(403).json({ 
      message: 'No tienes el permiso para consultar este RUT'
    })
  }
}