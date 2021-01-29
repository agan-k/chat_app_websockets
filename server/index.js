const express = require('express')

const config = require('./config/app')

const bodyParser = require('body-parser')

const cors = require('cors')

const router = require('./router')

const app = express()

// We're using two body parsers because one is specifically for uploading images and the other is for packaging up the json 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(router)

// Telling express where to serve static assets from 
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

const PORT = config.appPort

app.listen(PORT, () => {
  console.warn(`Server is running on ${PORT}`)
}) 
