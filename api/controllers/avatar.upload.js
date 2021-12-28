const { uploadErrors } = require('../utils/errors.utils')
const UserModel = require('../models/user.model')

module.exports.uploadProfil = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  // change the name of the file to the user's name
  const fileName = req.body.name + '.jpg'
  req.files.file.name = fileName

  // store the uploaded file into a variable
  let uploadedFile = req.files.file
  let uploadPath = `${__dirname}/../client/public/uploads/profil/${fileName}`

  // store the uploaded file on the server
  uploadedFile.mv(uploadPath, err => {
    if (err) return res.status(500).send(err)
    res.send('File uploaded!')
  })
}
