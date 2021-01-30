const express = require('express')

const config = require('./config/app')

const bodyParser = require('body-parser')

const cors = require('cors')

const router = require('./router')

const app = express()

const http = require('http')

// We're using two body parsers because one is specifically for uploading images and the other is for packaging up the json 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(router)

// Telling express where to serve static assets from 
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

const PORT = config.appPort

const server = http.createServer(app)
const SocketServer = require('./socket')
SocketServer(server)

server.listen(PORT, () => {
  console.warn(`Server is running on ${PORT}`)
}) 
