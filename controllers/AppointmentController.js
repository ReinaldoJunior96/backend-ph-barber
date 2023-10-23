const { Appointment: model } = require('../models/Appointment')
const { User } = require('../models/User')
const getInfoUser = require('../Utils/getUser')

const appointmentController = {
  create: async (req, res) => {
    try {
      const appointment = await
        model.create({...req.body, user: getInfoUser(req) })

      await User.findByIdAndUpdate(
        getInfoUser(req),
        { $push: { appointments: appointment._id } },
        { new: true }
      );


      return res.status(201).json({mgs: 'Appointment created successifily'})

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error creating appointment' })
    }
  },
  deleteAppointment: async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId;

      const deletedAppointment = await model.findByIdAndRemove(appointmentId);

      if (!deletedAppointment) {
        return res.status(404).json({ message: 'Compromisso não encontrado' });
      }

      return res.status(200).json({ message: 'Compromisso excluído com sucesso' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao excluir o compromisso' });
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
