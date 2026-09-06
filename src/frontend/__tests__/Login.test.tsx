import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Login from '../pages/Login'
import { useAuth } from '../contexts/AuthContext'

const { loginMock, navigateMock } = vi.hoisted(() => ({
  loginMock: vi.fn(),
  navigateMock: vi.fn(),
}))

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}))

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

const mockedUseAuth = vi.mocked(useAuth)

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    loginMock.mockResolvedValue(undefined)
    mockedUseAuth.mockReturnValue({
      user: null,
      token: null,
      loading: false,
      login: loginMock,
      logout: vi.fn(),
      isAuthenticated: false,
    })
  })

  it('envia las credenciales y navega al dashboard', async () => {
    render(<Login />)

    fireEvent.change(screen.getByPlaceholderText('ejemplo@dominio.com'), {
      target: { value: 'admin@prontopaga.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('********'), {
      target: { value: 'admin12345' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: 'admin@prontopaga.com',
        password: 'admin12345',
      })
      expect(navigateMock).toHaveBeenCalledWith('/dashboard')
    })
  })
})
