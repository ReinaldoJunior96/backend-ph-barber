const jwt = require('jsonwebtoken')

const getInfoUser = (req) => {
  const header = req.headers['authorization']
  const token = header && header.split(' ')[1]
  const user = jwt.verify(token, process.env.SECRET)
  return user.id
}

module.exports = getInfoUser



