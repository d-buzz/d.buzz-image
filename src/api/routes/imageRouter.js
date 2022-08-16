const { Router } =  require('express')
const uploadFleek = require('../controllers/upload')
const multer = require('multer')
const path = require("path")


const storage = multer.diskStorage({
  destination: './dbuzz-images',
  
  filename: (req, file, cb) => {
	return cb(null, `dbuzz-image-${Date.now()}.${file.mimetype.split('/')[1]}`)
  }
})

const upload = multer({
  storage: storage,
})

const imageRouter = Router()

imageRouter.post('/upload', function (req, res) {
   upload.single('image')(req, res, async function (err) {
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
