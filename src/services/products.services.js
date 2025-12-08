import {
  addProduct,
  deleteProductByIdModel,
  getProductByIdModelQuery,
  getProducts
} from '../models/firebase.js'

const products = [
  { id: 1, name: 'Producto 1', price: 1000 },
  { id: 2, name: 'Producto 2', price: 2000 }
]

//logica bien
export const getAllProductsMock = async (req, res) => {
  return products
}

//logica de la manera mas pro
export const getAllProductsFirebase = async () => {
  try {
    const snapshotResponse = await getProducts()
    return snapshotResponse.docs.map((doc) => ({
      //Se agrega el id manual porque firestore no lo incluye dentro de data
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Ocurrio un problema al obtener los productos', error)
  }
}

//logica bien
export const addProductFirebase = async (productBody) => {
  try {
    return await addProduct(productBody)
  } catch (error) {
    return new Error(
      'Ocurrio un error al intentar agregar el producto desde firebase',
      error
    )
  }
}

//Funcando
export const getProductByIdService = async (id) => {
  if (!id) {
    console.error('Se debe recibir un id en el metodo: getProductByIdService')
    return null
  }
  const productoAencontrar = await getProductByIdModelQuery(id)
  return productoAencontrar
}

//Funcando
export const deleteProductByIdService = async (id) => {
  if (!id) {
    console.error(
      'Se debe recibir un id en el metodo: deleteProductByIdService'
    )
    return null
  }
  const productoAeliminar = await deleteProductByIdModel(id)
  return productoAeliminar
}
