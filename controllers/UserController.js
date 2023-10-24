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
        return res.status(500).json({ message: 'Error creating user' })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Error creating user' })
    }
  },
  login: async (req, res) => {
    const user = await model.findOne({ email: req.body.email })
    if (!user) {
      return res.status(500).json({ message: 'Invalid user!' })
    }

    const secret = process.env.SECRET
    const token = jwt.sign({ id: user._id }, secret)

    if (!token) {
      return res.status(500).json({ message: 'Error generating token!' })
    }

    return res.status(200).json({ token, user })
  },
  userWithAppointments: async (req, res) => {
    try {
      const response = await model.findById(getUser(req)).populate('appointments')

      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'Error' })
    }
  }
}

module.exports = userController
