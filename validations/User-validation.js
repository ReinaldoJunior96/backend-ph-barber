const { User: model } = require('../models/User')

async function checkIfEmailExists (req, res) {
  const existingUser = await model.findOne({ email: req.body.email })
  if (existingUser) {
    res.status(500).json(
      {
        message: 'User already exists'
      }
    )
  }
}


module.exports = {
  checkIfEmailExists
}
