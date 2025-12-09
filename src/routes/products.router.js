import expres from 'express'
import {
  addProduct,
  deleteProductByIdController,
  getAllProductsController,
  getProductByIdController
} from '../controllers/products.controller.js'
import { authentication } from '../middlewares/authentication.js'
const routes = expres.Router()

routes.get('/products', getAllProductsController)
routes.get('/products/:id', getProductByIdController)
routes.delete('/products/:id', authentication, deleteProductByIdController)
routes.post('/products/post', authentication, addProduct)

export default routes
