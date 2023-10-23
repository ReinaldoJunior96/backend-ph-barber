const mongoose = require('mongoose')
const { Schema } = mongoose

const appointmentSchema = new Schema({
  dateTime: Date,
  service: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })
const Appointment = mongoose.model('Appointment', appointmentSchema)


module.exports = {
  Appointment
}

