import type { Request, Response } from 'express'
import { scoreService } from '../services/scoreService'

export const scoreController = {
  // Consultar el score por RUT
  getScore: (req: Request, res: Response): void => {
    try {
      const { rut } = req.params
      
      if (!rut || Array.isArray(rut)) {
        res.status(400).json({ 
          message: 'RUT es requerido' 
        })
        return
      }

      const result = scoreService.getScoreWithMetadata(rut)
      res.json(result)
      
    } catch (error) {
      console.error('Error al obtener score:', error)
      res.status(500).json({ 
        message: 'Error interno de el servidor' 
      })
    }
  }
}