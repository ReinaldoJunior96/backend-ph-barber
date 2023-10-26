const { Appointment: model } = require('../models/Appointment')
const { User } = require('../models/User')
const { checksIfTheDateIsGreaterThanTheCurrentDate } = require('../validations/Appointment-validation')
const getInfoUser = require('../Utils/getUser')
const moment = require('moment/moment')

const appointmentController = {
  create: async (req, res) => {
    try {
      console.log(req.body.dateTime)
      const requestedDate = moment(req.body.dateTime)

      if (requestedDate.isBefore(moment())) {
        return res.status(400).json({
          message: 'Date invalid!'
        })
      }

      const appointment = await model.create({ ...req.body, user: req.body.id ?? getInfoUser(req) })

      if (!appointment) {
        return res.status(500).json({ message: 'Error creating appointment' })
      }

      await User.findByIdAndUpdate(
        req.body.id ?? getInfoUser(req),
        {
          $push: {
            appointments: appointment._id
          }
        },
        { new: true }
      )

      return res.status(201).json({ message: 'Appointment created successfully' })

    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error creating appointment' })
    }
  },

  delete: async (req, res) => {
    try {
      const deletedAppointment = await model.findByIdAndRemove(req.params.id)

      if (!deletedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' })
      }

      return res.status(200).json({ message: 'Appointment deleted' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  all: async (req, res) => {
    try {
      const appointments = await model.find()
      res.status(200).json(appointments)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching appointments' })
    }
  }
}

module.exports = appointmentController
