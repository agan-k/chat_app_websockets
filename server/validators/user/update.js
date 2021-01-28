const { body } = require('express-validator')

// Self invoking function so you can leave the params off in auth.js
exports.rules = (() => {
  return [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('gender').notEmpty(),
    body('email').isEmail(),
    body('password').optional().isLength({ min: 5 }) // making this optional so if it is passed still check if it's the correct length
  ]
})()