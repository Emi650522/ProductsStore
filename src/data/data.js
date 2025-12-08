import 'dotenv/config'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

//Esta data esta en la url del proyecto de base de datos->
//https://console.firebase.google.com/u/2/project/expressproductsstore/settings/general/web:MjhiNzY1NjAtMTlmNC00NTU0LWJlNzAtNjM2MjExYWY2Zjk1?hl=es-419
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: 'expressproductsstore',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: '1017259341177',
  appId: process.env.FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

export { db }
