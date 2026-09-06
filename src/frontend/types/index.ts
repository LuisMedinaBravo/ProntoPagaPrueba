export interface User {
  id: string
  email: string
  role: 'admin' | 'user'
  rut: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface ScoreResponse {
  rut: string
  score: number
  fecha: string
}

export interface ApiError {
  message: string
  status?: number
}