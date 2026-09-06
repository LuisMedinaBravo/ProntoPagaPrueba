import jwt, { type SignOptions } from 'jsonwebtoken'
import type { User, TokenPayload } from '../types'

const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@prontopaga.com',
    password: 'admin12345',
    role: 'admin',
    rut: '12.345.678-9'
  },
  {
    id: '2',
    email: 'user@prontopaga.com',
    password: 'user12345',
    role: 'user',
    rut: '9.999.999-9'
  }
]

export const authService = {
  // Buscar usuario por email
  findUserByEmail: (email: string): User | undefined => {
    return MOCK_USERS.find(user => user.email === email)
  },

  // Validar credenciales
  validateCredentials: (email: string, password: string): User | null => {
    const user = authService.findUserByEmail(email)
    if (!user) return null
    if (user.password !== password) return null
    return user
  },

  // Generar JWT
  generateToken: (user: User): string => {
    const payload: TokenPayload = {
      sub: user.id,
      role: user.role,
      ...(user.role === 'user' ? { rut: user.rut } : {})
    }
    
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as SignOptions['expiresIn']
    })
  }
}