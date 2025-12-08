import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import { db } from '../data/data.js'

export async function getProducts() {
  return await getDocs(collection(db, 'productos'))
}

export async function getProductByIdModel(id) {
  const docRef = doc(db, 'productos', String(id))
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
    return JSON.stringify(docSnap.data(), 2)
  } else {
    console.log('Producto inexistente en la base de datos')
    return undefined
  }
}

export async function getProductByIdModelQuery(id) {
  const ref = collection(db, 'productos')
  const q = query(ref, where('id', '==', String(id)))

  const snap = await getDocs(q)
  if (!snap.empty) {
    return snap.docs[0]
  } else {
    console.log(`Producto con id: ${id} inexistente en la base de datos`)
    return false
  }
}

export async function addProduct(product) {
  console.log('Datos recibidos en addProduct de firebase->', product)
  try {
    const docSnap = await addDoc(
      collection(db, 'productos'),
      {
        id: product.id,
        nombre: product.nombre,
        categoria: product.categoria,
        precio: product.precio
      },
      console.log('Producto con id : ' + product.id + ' creado con exito!')
    )
  } catch (error) {
    console.error('Error al Producto', error)
  }
}

export async function deleteProductByIdModel(id) {
  const ref = collection(db, 'productos')
  const q = query(ref, where('id', '==', String(id)))

  const snap = await getDocs(q)

  if (snap.empty) {
    console.log('No existe un producto con el ID> ' + id)
    return false
  }

  const docToDelete = snap.docs[0]

  // Eliminamos el documento  por documentId
  await deleteDoc(doc(db, 'productos', docToDelete.id))
  return true
}

deleteProductByIdModel
