const router = require('express').Router()

const appointmentRouter = require('./Appointment')
const usuarioRouter = require('./User')

router.use('/appointments', appointmentRouter)
router.use('/users', usuarioRouter)

module.exports = router
