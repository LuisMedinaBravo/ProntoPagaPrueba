import { describe, expect, it } from 'vitest'
import { scoreService } from '../services/scoreService'

describe('scoreService', () => {
  it('devuelve el mismo score para el mismo RUT', () => {
    const firstScore = scoreService.getScore('12.345.678-9')
    const secondScore = scoreService.getScore('12.345.678-9')

    expect(firstScore).toBe(secondScore)
  })

  it('ignora puntos y guion del RUT', () => {
    const formattedScore = scoreService.getScore('12.345.678-9')
    const unformattedScore = scoreService.getScore('123456789')

    expect(formattedScore).toBe(unformattedScore)
  })

  it('genera un score entre 0 y 100 con metadata', () => {
    const result = scoreService.getScoreWithMetadata('12.345.678-9')

    expect(result.rut).toBe('12.345.678-9')
    expect(result.score).toBeGreaterThanOrEqual(0)
    expect(result.score).toBeLessThanOrEqual(100)
    expect(Number.isNaN(Date.parse(result.fecha))).toBe(false)
  })
})
