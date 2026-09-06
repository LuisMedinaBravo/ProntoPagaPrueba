import axios from 'axios'
import type { AuthResponse, LoginCredentials, ScoreResponse } from '../types'

// URL del backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Configuración de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Agregar token a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Servicio de autenticación
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/login', credentials)
    return data
  },
}

// Servicio de score
export const scoreService = {
  getScore: async (rut: string): Promise<ScoreResponse> => {
    const { data } = await api.get(`/score/${rut}`)
    return data
  },
}

export default api