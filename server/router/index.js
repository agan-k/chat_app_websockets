const router = require('express').Router()

router.post('/home', (req, res) => {
  return res.send('Home Screen')
})

router.post('/login', (req, res) => {
  return res.send('Login screen works now')
})


module.exports = router