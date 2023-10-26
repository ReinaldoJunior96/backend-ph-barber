const router = require('express').Router()
const appointmentController = require('../controllers/AppointmentController')
const authMiddleware = require('../middlewares/Auth')

router
  .post('/created', authMiddleware, (req, res) => appointmentController.create(req, res))

router
  .delete('/delete/:id', authMiddleware, (req, res) => appointmentController.delete(req, res))
router
  .get('/all', authMiddleware, (req, res) => appointmentController.all(req, res))

module.exports = router
