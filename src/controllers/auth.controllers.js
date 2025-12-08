import generateToken from '../data/token-test.js'

const login = async (req, res) => {
  const { email, password } = req.body

  //Aca habria que usar una autenticacion seria con una libreria o algo propio
  //Podriamos ir a buscar usuarios  una base de datos creada con ids y correos electronicos
  if (email === 'test@gmail.com' && password === '123456') {
    const user = { email: email, id: '1' }
    const token = await generateToken(user)
    res.json({ token })
  } else {
    res.status(401).send()
  }
}

export { login }
