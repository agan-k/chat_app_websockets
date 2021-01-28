const router = require('express').Router()
const { update } = require('../controllers/userController')
const { validate } = require('../validators')
const { auth } = require('../middleware/auth')
const { rules: updateRules } = require('../validators/user/update')
// const { userFile } = require('../middleware/fileUpload')

router.post('/update', [auth, updateRules, validate], update)
// router.get('/search-users', auth, search)

module.exports = router