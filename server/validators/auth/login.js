const { body } = require('express-validator')

// Self invoking function so you can leave the params off in auth.js
exports.rules = (() => {
  return [
    body('email').isEmail()
  ]
})()