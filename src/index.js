require('dotenv').config({ path: '../.env' })
const express = require('express')
const api = require('./api')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

const port = process.env.APP_PORT

app.get('/', (req, res) => {
  res.send({
    status: 'online',
  })
})

app.use('/api/v1', api)
app.listen(port, () => console.log(`server running on port ${port}`))
