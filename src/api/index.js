const express = require('express')
const imageRouter = require('./routes/imageRouter')
const api = express()

api.use('/image', imageRouter)

module.exports = api