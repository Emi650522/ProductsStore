import 'dotenv/config'
import jwt from 'jsonwebtoken'
const secret_key = process.env.JWT_SECRET_KEY
// Middleware para verificar el token JWT
export const authentication = (req, res, next) => {
  //Me quedo con el token despues del espacio-> Bearer ...token}
  const token = req.headers['authorization'].split(' ')[1]

  if (!token || token === undefined) return res.sendStatus(401)

  jwt.verify(token, secret_key, (err) => {
    if (err) return res.sendStatus(403)
    next()
  })
}
