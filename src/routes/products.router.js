import expres from 'express'
import {
  addProduct,
  deleteProductByIdController,
  getAllProductsController,
  getProductByIdController
} from '../controllers/products.controller.js'
import { authentication } from '../middlewares/authentication.js'
const routes = expres.Router()

routes.get('/products', authentication, getAllProductsController)
routes.get('/products/:id', getProductByIdController)
routes.delete('/products/:id', deleteProductByIdController)
routes.post('/products/create', addProduct)

export default routes
