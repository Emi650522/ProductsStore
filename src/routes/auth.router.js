import expres from 'express'
import { login } from '../controllers/auth.controllers.js'

const routes = expres.Router()

routes.post('/login', login)

export default routes
