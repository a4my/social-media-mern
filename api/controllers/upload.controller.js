const UserModel = require('../models/user.model')
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)
const { uploadErrors } = require('../utils/errors.utils')

// // Storage destination for post file upload
// const storagePost = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images')
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name)
//   }
// })

// // Share a file in a post
// const upload = multer({ storage: storagePost })
// app.post('/api/upload', upload.single('file'), (req, res) => {
//   try {
//     return res.status(200).json('File uploaded successfully')
//   } catch (error) {
//     console.error(error)
//   }
// })

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== 'image/jpg' &&
      req.file.detectedMimeType !== 'image/png' &&
      req.file.detectedMimeType !== 'image/jpeg'
    )
      throw Error('invalid file')

    if (req.file.size > 500000) throw Error('max size')
  } catch (err) {
    const errors = uploadErrors(err)
    return res.status(201).json({ errors })
  }
  const fileName = req.body.name + '.jpg'

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  )

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: './uploads/profil/' + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs)
        else return res.status(500).send({ message: err })
      }
    )
  } catch (err) {
    return res.status(500).send({ message: err })
  }
}
