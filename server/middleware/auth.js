// Check if any token was passed with this request
// Is the token actually valid
const jwt = require('jsonwebtoken')
const config = require('../config/app')

// req, res and next come from express and we call next no that express can continue running properly
exports.auth = (req, res, next) => {

  // checking what we have in our headers
  const authHeader = req.headers['authorization']
  // Extract the token from the header
  const token = authHeader && authHeader.split(' ')[1]

  // Send error if there is no token
  if (!token) {
    return res.status(401).json({error: 'Missing Token'})
  }

  // use jwt verify to get the user based on the token
  jwt.verify(token, config.appKey, (err, user) => {

    if (err) {
      return res.status(401).json({error: err})
    }

    req.user = user
    console.log(user)
  })
  next()
}
