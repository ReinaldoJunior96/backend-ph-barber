const router = require("express").Router()
const appointmentController = require('../controllers/AppointmentController')

router
  .route("/created")
  .post((req, res) => appointmentController.create(req, res));


router
  .route("/all")
  .get((req, res) => appointmentController.all(req, res));





module.exports = router;
