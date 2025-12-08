import 'dotenv/config.js'
import jwt from 'jsonwebtoken'

//Se podria generar random dentro del .env?
const secret_key = process.env.JWT_SECRET_KEY

const generateToken = (userData) => {
  const user = { id: userData.id, email: userData.email }
  const expiration = { expiresIn: '1h' }
  //Firmamos el token
  return jwt.sign(user, secret_key, expiration)
}

const token = generateToken({ email: 'test@gmail.com', id: 1 })
console.log('Token->', token)

export default generateToken
