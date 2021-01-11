require('dotenv').config()
const fleekStorage = require('@fleekhq/fleek-storage-js')
const fs = require('fs')

const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET

const imageUploadFleek = async(data) => {
  const filename = data.filename
  try {
    const content = fs.readFileSync(`dbuzz/${data.filename}`)
  
    const imageFile = {
      apiKey,
      apiSecret,
      key: `dbuzz/${filename}`,
      data: content,
    }

    let result = await fleekStorage.upload(imageFile)

    result.hashV0 = result.hashV0.replace(/['"]+/g, '')
    const imagePath = `dbuzz/${filename}`
    fs.unlinkSync(imagePath)
    console.log('file successfully removed')

    return result

  } catch(error) {
    const imagePath = `dbuzz/${filename}`
    fs.unlinkSync(imagePath)
    console.log('error', error)
    return res.status(400).send({ message: 'Image Upload error has occurred' })
  }

}

module.exports = imageUploadFleek