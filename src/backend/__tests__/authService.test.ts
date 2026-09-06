import { describe, expect, it } from 'vitest'
import jwt from 'jsonwebtoken'
import { authService } from '../services/authService'

process.env.JWT_SECRET = 'test-secret'
process.env.JWT_EXPIRES_IN = '1h'

describe('authService', () => {
  it('encuentra un usuario por email', () => {
    const user = authService.findUserByEmail('admin@prontopaga.com')

    expect(user?.role).toBe('admin')
  })

  it('rechaza credenciales invalidas', () => {
    const user = authService.validateCredentials(
      'admin@prontopaga.com',
      'password-incorrecto'
    )

    expect(user).toBeNull()
  })

  it('genera un token JWT valido', () => {
    const user = authService.findUserByEmail('admin@prontopaga.com')
    expect(user).toBeDefined()

    const token = authService.generateToken(user!)
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload

    expect(payload.sub).toBe('1')
    expect(payload.role).toBe('admin')
    expect(payload.rut).toBeUndefined()
  })
})
