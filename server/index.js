const express = require('express')

const config = require('./config/app')


const router = require('./router')

const app = express()

app.use(router)

const PORT = config.appPort

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
  console.log(config)
}) 
