const express = require('express')
const api = require('./api')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({
    status: 'online',
  })
})

app.use('/api/v1', api)
app.listen(3040, () => console.log('server running on port 3040'))