const { User: model, getUser } = require('../models/User')
const { checkIfEmailExists } = require('../validations/User-validation')
const jwt = require('jsonwebtoken')

const userController = {
  create: async (req, res) => {
    try {
      await checkIfEmailExists(req, res)
      const user = await model.create(req.body)
      if (user) {
        res.status(201).json({
          message: 'User created successfully!',
          user,
        })
      } else {
        res.status(500).json({ message: 'Error creating user' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error creating user' })
    }
  },

  login: async (req, res) => {
    const user = await model.findOne({ email: req.body.email })

    if (!user) {
      res.status(500).json({ message: 'Invalid user!' })
    }

    const secret = process.env.SECRET
    const token = jwt.sign({ id: user.id }, secret)

    if (!token) {
      res.status(500).json({ message: 'Error generating token!' })
    }

    res.status(200).json({ token, user })
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
