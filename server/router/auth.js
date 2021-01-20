const router = require('express').Router()
const { login, register } = require('../controllers/authController')
// const { validate } = require('../validators')
// const { rules: registrationRules } = require('../validators/auth/register')
// const { rules: loginRules } = require('../validators/auth/login')

router.post('/login', login)

router.post('/register', register)

module.exports = router