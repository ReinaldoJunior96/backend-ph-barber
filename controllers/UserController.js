const { User: model, getUser } = require('../models/User')
const jwt = require('jsonwebtoken')

const userController = {
  create: async (req, res) => {
    try {
      const user = await model.create(req.body)
      const response = await model.create(user)

      res.status(201).json({
        'mgs': 'User created successfully!',
        user
      })
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' })
    }
  },
  login: async (req, res) => {
    const user = await model.findOne({ email: req.body.email })
    console.log(user._id)
    const secret = process.env.SECRET
    const token = jwt.sign(
      {
        id: user.id
      },
      secret
    )

    res.status(200).json({ mgs: 'usuário logado', token })
  },
  dataUser: async (req, res) => {
    try {
      const header = req.headers['authorization']
      const token = header && header.split(' ')[1]
      const decodedToken = jwt.verify(token, process.env.SECRET)
      const user = await model.findById(decodedToken.id, '-password')
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user data' })
    }
  },
  userWithAppointments: async (req, res) => {
    try {
      const userID = getUser(req)
      const response = await model.findById(userID).populate('appointments')

      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'Error' })
    }
  }

}

module.exports = userController
