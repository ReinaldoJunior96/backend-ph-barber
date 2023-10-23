// No arquivo Auth.js
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const header = req.headers['authorization']
  const token = header && header.split(' ')[1]
  if (!token) {
    return res.status(401).json({ mgs: 'Acesso negado!' })
  }
  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret)
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ mgs: 'Token inválido!!' })
  }
}

