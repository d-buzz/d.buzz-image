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
  limits: {
    fileSize: 50 * 1024 * 1024  
  },
})

const imageRouter = Router()

imageRouter.post('/upload', upload.single('image'),async (req, res) => {
  try {
    const data = req.file
    const result = await uploadFleek(data)

    res.json(result)
    
  } catch (error) {
    console.log({error})
    res.status(400).send(error)
  }
    
})

module.exports = imageRouter
