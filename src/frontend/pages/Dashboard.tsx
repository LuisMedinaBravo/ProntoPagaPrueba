import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { scoreService } from '../services/api'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [rut, setRut] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [fecha, setFecha] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setShowResult(false)

    const cleanRut = rut.replace(/[.-]/g, '')

    try {
      const data = await scoreService.getScore(cleanRut)
      setScore(data.score)
      setFecha(data.fecha)
      setShowResult(true)
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al consultar el score'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const formatRut = (rut: string) => {
    const clean = rut.replace(/[.-]/g, '')
    if (clean.length <= 1) return clean
    const body = clean.slice(0, -1)
    const dv = clean.slice(-1)
    return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Consulta de Riesgo Financiero</h1>
        <div className="user-info">
          <span>👤 {user?.email}</span>
          <span className={`role-badge ${user?.role}`}>
            {user?.role === 'admin' ? '🔑 Admin' : '👤 User'}
          </span>
          <button onClick={logout} className="btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="score-card">
          <h2>🔍 Consultar Score</h2>
          
          <form onSubmit={handleSubmit} className="search-form">
            <div className="input-group">
              <input
                type="text"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder="Ingresa el RUT (ej: 12345678-9)"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Consultando...' : 'Consultar'}
              </button>
            </div>
          </form>

          {error && <div className="error-message">❌ {error}</div>}

          {showResult && (
            <div className="result-container">
              <h3>Resultado</h3>
              <div className="result-content">
                <div className="result-item">
                  <span className="label">RUT</span>
                  <span className="value">{formatRut(rut)}</span>
                </div>
                <div className="result-item score-item">
                  <span className="label">Score</span>
                  <span className={`score-value ${score! >= 70 ? 'high' : score! >= 40 ? 'medium' : 'low'}`}>
                    {score} / 100
                  </span>
                </div>
                <div className="result-item">
                  <span className="label">Fecha</span>
                  <span className="value">
                    {new Date(fecha).toLocaleDateString('es-CL', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}

          {user?.role === 'admin' && (
            <div className="admin-info">
              <p>Eres el administrador. Puedes consultar cualquier RUT.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard