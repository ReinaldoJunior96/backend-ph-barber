const mong = require('mongoose')
const jwt = require('jsonwebtoken')
const { Schema } = mong

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  appointments: [
    {
      type: mong.Schema.Types.ObjectId,
      ref: 'Appointment',
    }
  ]
}, { timestamps: true })
const User = mong.model('User', userSchema)

const getUser = (req) => {
  const header = req.headers['authorization']
  const token = header && header.split(' ')[1]
  const user = jwt.verify(token, process.env.SECRET)
  return user.id
}
module.exports = {
  User,
  getUser
}
