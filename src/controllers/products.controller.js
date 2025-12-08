import {
  addProductFirebase,
  deleteProductByIdService,
  getAllProductsFirebase,
  getProductByIdService
} from '../services/products.services.js'

export const getAllProductsController = async (req, res) => {
  console.log('En metodo-> getAllProductsController ')
  try {
    const productsResponse = await getAllProductsFirebase()
    res.status(200).json(productsResponse)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener productos' })
  }
}

export const getProductByIdController = async (req, res) => {
  const id = Number(req.params.id)
  try {
    const getProductByIdResponse = await getProductByIdService(id)
    if (!id) {
      res
        .status(403)
        .json(
          ' El parametro id en el metodo getProductByIdController debe ser un numero valido '
        )
    }
    if (!getProductByIdResponse || getProductByIdResponse == false) {
      res.status(404).json('No se encontro el producto con id: ' + id)
    }

    const productoEncontrado = {
      id: getProductByIdResponse.id,
      ...getProductByIdResponse.data()
    }

    res.status(200).json({ productoEncontrado })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error en el servicio al obtener productos' })
  }
}

export const deleteProductByIdController = async (req, res) => {
  const id = Number(req.params.id)
  try {
    const getProductByIdResponse = await deleteProductByIdService(id)
    if (!id) {
      res
        .status(403)
        .json(
          ' El parametro id en el metodo getProductByIdController debe ser un numero valido '
        )
    }
    if (!getProductByIdResponse || getProductByIdResponse == false) {
      res.status(404).json('No se encontro el producto con id: ' + id)
    }
    res
      .status(200)
      .json(
        'Producto con id: ' + id + ' eliminado satisfactoriamente!',
        getProductByIdResponse
      )
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error en el servicio al intentar eliminar productos' })
  }
}

export const addProduct = async (req, res) => {
  console.log('En metodo-> getProductByIdPosta desde el controller ')
  const { id, nombre, precio, categoria } = await req.body
  try {
    console.log('datitos para el body-> ', id, nombre, precio, categoria)
    const addProductResponse = await addProductFirebase({
      id: id,
      nombre: nombre,
      precio: precio,
      categoria: categoria
    })
    if (!nombre || !precio || !categoria || !id) {
      res
        .status(400)
        .json(
          ' Todos Los parametros  del body  deben ser enviados para poder crear el producto correctamente '
        )
    }
    res.status(201).json(addProductResponse)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error en el servicio al intentar crear un  producto' })
  }
}
