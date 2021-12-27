const { uploadErrors } = require('../utils/errors.utils')
const UserModel = require('../models/user.model')

const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)

module.exports.uploadProfil = async (req, res) => {
  try {
    if (!req.file.originalname.match(/\.(png|jpg|jpeg)$/))
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

  // try {
  //   await UserModel.findByIdAndUpdate(
  //     req.body.userId,
  //     { $set: { picture: './uploads/profil/' + fileName } },
  //     { new: true, upsert: true, setDefaultsOnInsert: true },
  //     (err, docs) => {
  //       if (!err) return res.send(docs)
  //       else return res.status(500).send({ message: err })
  //     }
  //   )
  // } catch (err) {
  //   return res.status(500).send({ message: err })
  // }

  try {
    return res.status(200).json('File uploaded successfully')
  } catch (error) {
    console.error(error)
  }

  // console.log(JSON.stringify(req.file))
  // var response = '<a href="/">Home</a><br>'
  // response += 'Files uploaded successfully.<br>'
  // response += `<img src="${req.file.path}" /><br>`
  // return res.send(response)
}
