export interface User {
  id: string
  email: string
  password: string
  role: 'admin' | 'user'
  rut: string
}

export interface TokenPayload {
  sub: string
  role: 'admin' | 'user'
  rut?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface ScoreResponse {
  rut: string
  score: number
  fecha: string
}