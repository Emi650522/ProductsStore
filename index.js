import cors from 'cors'
import express from 'express'
import authRoutes from './src/routes/auth.router.js'
import productRoutes from './src/routes/products.router.js'
const app = express()

//Declaramos el puerto
const PORT = process.env.PORT || 3001

//Configuracion de CORS
const corsConfig = {
  origin: ['http://localhost:3001/', 'https://midominio.com/'], // dominios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // cabeceras permitidas
  exposedHeaders: ['Content-Length'], // cabeceras visibles al cliente
  credentials: true, // habilitar credenciales
  maxAge: 600, // cache preflight
  optionsSuccessStatus: 204 // respuesta preflight exitosa
}

//npm i dotenv-> libreria para manejar variables de entorno

app.use(cors(corsConfig))
app.use(express.json()) // usar json

//Esto seria para usar la autenticacion globalmente
// app.use(authentication)

//Usamos el router
app.use('/api', productRoutes)
app.use('/api', authRoutes)

//Capturamos cualquier ruta invalida y devolvemos 404
app.use((req, res, next) => {
  res.status(404).send('Recurso no encontrado o ruta inválida')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
