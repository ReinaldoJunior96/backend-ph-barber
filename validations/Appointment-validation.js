const { User: model } = require('../models/Appointment')
const moment = require('moment')

async function checksIfTheDateIsGreaterThanTheCurrentDate (req, res) {
  const requestedDate = moment(req.body.date)
  if (requestedDate.isBefore(moment())) {
    return res.status(500).json(
      {
        message: 'Date invalid!'
      }
    )
  }
}

module.exports = {
  checksIfTheDateIsGreaterThanTheCurrentDate
}
