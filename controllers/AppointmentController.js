const { Appointment: model } = require('../models/Appointment')
const { User } = require('../models/User')
const { checksIfTheDateIsGreaterThanTheCurrentDate } = require('../validations/Appointment-validation')
const getInfoUser = require('../Utils/getUser')

const appointmentController = {
  create: async (req, res) => {
    try {
      await checksIfTheDateIsGreaterThanTheCurrentDate(req, res)

      const appointment = await
        model.create({ ...req.body, user: req.body.id ?? getInfoUser(req) })

      if (appointment) {
        res.status(500).json({ message: 'Error creating appointment' })
      }

      await User.findByIdAndUpdate(
        req.body.id ?? getInfoUser(req),
        {
          $push:
            {
              appointments: appointment._id
            }
        },
        { new: true }
      )
      return res.status(201).json({ mgs: 'Appointment created successifily' })

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error creating appointment' })
    }
  },
  delete: async (req, res) => {
    try {

      const deletedAppointment = await model.findByIdAndRemove(req.body.appointmentId)

      if (!deletedAppointment) {
        return res.status(500).json({ message: 'Error... appointment not found!' })
      }

      return res.status(200).json({ message: 'Appointment deleted!' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error... appointment not found!' })
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
