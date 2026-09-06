import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { useAuth } from '../contexts/AuthContext'

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

const mockedUseAuth = vi.mocked(useAuth)

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirige a login cuando no hay autenticacion', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      token: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: false,
    })

    render(
      <MemoryRouter initialEntries={['/privada']}>
        <Routes>
          <Route
            path="/privada"
            element={
              <ProtectedRoute>
                <div>Contenido privado</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Pantalla de login</div>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Pantalla de login')).toBeInTheDocument()
  })

  it('muestra el contenido cuando el usuario esta autenticado', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      token: 'token-de-prueba',
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: true,
    })

    render(
      <MemoryRouter initialEntries={['/privada']}>
        <Routes>
          <Route
            path="/privada"
            element={
              <ProtectedRoute>
                <div>Contenido privado</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Contenido privado')).toBeInTheDocument()
  })
})
