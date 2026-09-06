import type { ScoreResponse } from '../types'

const formatRut = (rut: string) => {
  const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase()
  if (cleanRut.length <= 1) return cleanRut

  const body = cleanRut.slice(0, -1)
  const verificationDigit = cleanRut.slice(-1)
  return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${verificationDigit}`
}

export const scoreService = {
  // Algoritmo determinístico para que siempre devuelva el mismo score para el mismo RUT
  getScore: (rut: string): number => {
    // Quitar puntos y guión
    const cleanRut = rut.replace(/[.-]/g, '')
    
    // Generar hash consistente
    let hash = 0
    for (let i = 0; i < cleanRut.length; i++) {
      const char = cleanRut.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    
    // Score entre 0 y 100
    return Math.abs(hash) % 101
  },

  // Obtener score
  getScoreWithMetadata: (rut: string): ScoreResponse => {
    const score = scoreService.getScore(rut)
    
    return {
      rut: formatRut(rut),
      score,
      fecha: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
    }
  }
}