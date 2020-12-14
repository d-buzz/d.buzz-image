const { Router } =  require('express')
const uploadFleek = require('../controllers/upload')
const multer = require('multer')
const path = require("path")


const storage = multer.diskStorage({
  destination: './dbuzz',
  
  filename: (req, file, cb) => {
      return cb(null, `file-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
}).single('image')

const imageRouter = Router()

imageRouter.post('/upload', function (req, res) {
   upload (req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ message: 'Image Upload error has occurred! Image should not be more than 10 mb' })
    } else if (err) {
      return res.status(400).send({ message: 'Image Upload error has occurred!' })
    }
    const data = req.file
    const result = await uploadFleek(data)

    res.json(result)
  })
})

module.exports = imageRouter
