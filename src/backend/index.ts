import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config()

// Importar rutas
import authRoutes from './routes/authRoutes'
import scoreRoutes from './routes/scoreRoutes'

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares globales
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    message: 'Servidor arriba',
    timestamp: new Date().toISOString()
  })
})

// Rutas de la API
app.use('/api/auth', authRoutes)
app.use('/api/score', scoreRoutes)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
  console.log(`Health: http://localhost:${PORT}/health`)
  console.log(`Login: POST http://localhost:${PORT}/api/auth/login`)
  console.log(`Score: GET http://localhost:${PORT}/api/score/:rut`)
})