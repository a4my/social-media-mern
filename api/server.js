const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
require('dotenv').config({ path: './config/.env' })
require('./config/db')
const { checkUser, requireAuth } = require('./middleware/auth.middleware')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const { uploadErrors } = require('./utils/errors.utils')
const UserModel = require('./models/user.model')

const app = express()

// Avatar upload
app.use(fileUpload())
app.post('/api/user/upload', async (req, res) => {
  // check for errors
  try {
    if (!req.files.file.name.match(/\.(png|jpg|jpeg)$/))
      throw Error('invalid file')
    if (req.files.file.size > 500000) throw Error('max size')
    if (!req.files || Object.keys(req.files).length === 0)
      throw Error('no file')
  } catch (err) {
    const errors = uploadErrors(err)
    return res.status(201).json({ errors })
  }

  // change the name of the file to the user's name
  const fileName = req.body.name + '.jpg'
  req.files.file.name = fileName

  // store the uploaded file into a variable
  const uploadedFile = req.files.file
  const uploadPath = `${__dirname}/../client/public/uploads/profil/${fileName}`

  // Add to datatbase
  try {
    uploadedFile.mv(uploadPath)

    UserModel.findByIdAndUpdate(
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

  // store the uploaded file on the server
  // uploadedFile.mv(uploadPath, err => {
  //   if (err) {
  //     res.status(500).send(err)
  //   } else {
  //     res.status(200).send({ status: 'File uploaded!', path: uploadPath })
  //   }
  // })

  // Add to datatbase
  // try {
  // await UserModel.findByIdAndUpdate(
  //   req.body.userId,
  //   { $set: { picture: './uploads/profil/' + fileName } },
  //   { new: true, upsert: true, setDefaultsOnInsert: true },
  //   (err, docs) => {
  //     if (!err) return res.send(docs)
  //     else return res.status(500).send({ message: err })
  //   }
  // )
  // } catch (err) {
  //   return res.status(500).send({ message: err })
  // }
})

// CORS config
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false
}
app.use(cors(corsOptions))

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// JWT
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// user routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})
