
// Bringing in the validation response from the auth router
const {validationResult} = require('express-validator')

exports.validate = (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  next()
}