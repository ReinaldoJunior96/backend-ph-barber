// Em routes.js
const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const authMiddleware = require('../middlewares/Auth')

// Rota para login com middleware 'authorization'
router.post('/login', (req, res) => userController.login(req, res))
router.post('/created', (req, res) => userController.create(req, res))

router.get('/i', authMiddleware, (req,res) => userController.dataUser(req,res))
router.get(
  '/appointments',
  authMiddleware, (req,res) => userController.userWithAppointments(req,res)
)

router.get('/logout', authMiddleware, (req, res) => {
  // Lógica de logout aqui
  res.status(200).json({ message: 'Rota de deslogar usuário' })
})

module.exports = router
